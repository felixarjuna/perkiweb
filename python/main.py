import pandas as pd
import glob
from notion_client import Client
import os


def main():
    df = read_and_prepare_csv_data()
    df.to_excel('output_date.xlsx', index=False)
    create_database(df)


def read_and_prepare_csv_data():
    # get all csv files in the database folder
    database_folder = os.path.join(os.getcwd(), 'python', 'database')
    csv_files: list[str] = glob.glob(
        os.path.join(database_folder, '*.csv'))

    # read as dataframe and concatenate all files
    df_list = [pd.read_csv(file) for file in csv_files]
    combined_df = pd.concat(df_list, ignore_index=True)

    print(f"Found {combined_df.__len__()
                   } data from the database before prepartion.")

    # data preparation: remove duplicates and reset index
    combined_df = combined_df.dropna(subset=['Description'])
    prepared_df = combined_df.drop_duplicates(
        subset=['Description', 'Date', 'Amount']).reset_index(drop=True)

    # Convert 'Date' column to datetime
    prepared_df['Date'] = pd.to_datetime(prepared_df['Date'])

    # Sort the dataframe by the 'Date' column
    prepared_df = prepared_df.sort_values('Date', ascending=True)

    print(f"Found {prepared_df.__len__()
                   } data from the database after prepartion.")

    return prepared_df


def create_database(df):
    # Notion API setup
    # Initialize Notion client
    notion = Client(auth="secret_Fxx7jhyoHCQqX8khGbbPn6tCUdcpaRkZP768lGt7fvn")

    # Specify the database ID
    database_id = "522ed7d2cc76434c880fa38d7de84784"

    # Delete existing data in Notion
    # Query all pages in the database
    results = notion.databases.query(database_id=database_id)["results"]

    # Delete each page
    for page in results:
        notion.pages.update(page_id=page["id"], archived=True)

    # Create new table in Notion

    # Prepare data for Notion API
    notion_data = df.to_dict('records')

    # Add each row to Notion
    for row in notion_data:
        properties = {}
        for key, value in row.items():
            if key == "Description":
                properties[key] = {
                    "title": [{"text": {"content": str(value)}}]}
            elif key == "Receipt":
                properties[key] = {"url": str(value)}
            elif key == "Date":
                properties[key] = {
                    "date": {"start": value.isoformat()[:10]}}
            elif key == "Amount":
                properties[key] = {"number": float(value)}
            elif key == "income/expense":
                properties[key] = {"select": {"name": str(value)}}
            elif key == "Category":
                properties[key] = {"multi_select": [
                    {"name": item.strip()} for item in str(value).split(',')]}
            elif key == "Account":
                properties[key] = {"select": {"name": str(value)}}
            elif key == "Notes":
                properties[key] = {"rich_text": [
                    {"text": {"content": str(value)}}]}
            elif key == "Double Checked":
                properties[key] = {"checkbox": bool(value)}
            elif key == "uses":
                properties[key] = {"select": {"name": str(value)}}

        notion.pages.create(
            parent={"database_id": database_id},
            properties=properties
        )

    print("Data successfully updated in Notion!")


if (__name__ == "__main__"):
    main()
