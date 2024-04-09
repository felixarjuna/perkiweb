import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schedules } from "./schema/schema";

import * as dotenv from "dotenv";
dotenv.config();

const scheduleList = [
  {
    id: 4,
    title: "Sent to show Christ’s Glory",
    date: new Date("2023-07-28T20:00:00.000Z"),
    speaker: "Pdt. Titus Christanto",
    bibleVerse: "Yohanes 12:27-36",
    summary:
      "According to the Bible, there is nothing greater than the glory of God. But that term is so far away for us now. Most Christians have heard of doing things for the glory of God, but what does that mean? \n\nDo you want to have meaning in life? Do you have a need for deep personal change? Do you care about justice in the world? The key to all of those things is the glory of God.\n",
    liturgos: "Danny Kurniawan",
    musician: "Reggy Irawan",
    multimedia: "Danny Kurniawan",
    accommodation: "Danny Kurniawan",
    cookingGroup: "Group 6",
    cleaningGroup: "Group 2",
    fellowshipType: "ChurchService",
  },
  {
    id: 5,
    title: "What is the church? - Holiness",
    date: new Date("2023-09-08T18:00:00.000Z"),
    speaker: "Pdt. Titus Christanto",
    bibleVerse: "1 Korintus 1 -2, 5, dan 6",
    summary:
      "What is the Church? Is it relevant for us as fellowship members? In this series, we begin by really learning what a church actually is, and what is actually desired for the people in it.",
    liturgos: "Reggy Irawan",
    musician: "Felix Arjuna",
    multimedia: "Victor Jordan",
    accommodation: "Jordie Yonathan",
    cookingGroup: "Group 6",
    cleaningGroup: "Group 2",
    fellowshipType: "ChurchService",
  },
  {
    id: 6,
    title: "What is the church? - Unity",
    date: new Date("2023-09-15T20:00:00.000Z"),
    speaker: "Danny Kurniawan",
    bibleVerse: "1 Korintus 3:1-9, 11:17-34",
    summary:
      "What exactly does unity in the Church mean? What does it mean to be a Church where all members must be in harmony with each other? What does the Bible mean by one Church?",
    liturgos: null,
    musician: "Albertus Pandya",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 4",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 7,
    title: "What is the church? - Loving",
    date: new Date("2023-09-22T20:00:00.000Z"),
    speaker: "Pdt. Titus Christanto",
    bibleVerse: "1 Korintus 8-14, 8:1",
    summary:
      "The law of love is something we hear all the time and sometimes it becomes a cliché. However, sometimes the simple things become the most difficult things for us to apply. Many churches become places where people get hurt, become wounded and even outcast, not to bring out the love of Christ there. ",
    liturgos: "Toni Setiawan",
    musician: "Clarissa Adelyne",
    multimedia: "Danny Kurniawan",
    accommodation: "Reggy Irawan",
    cookingGroup: "Group 1",
    cleaningGroup: "Group 5",
    fellowshipType: "ChurchService",
  },
  {
    id: 8,
    title: "Biblical Theology",
    date: new Date("2023-09-29T20:00:00.000Z"),
    speaker: "Steffen Josua",
    bibleVerse: "Lukas 24:13-35",
    summary:
      "Biblical theology teaches us to read the Bible as one story about the person and work of Christ. Biblical theology is not only central to how we should read the Bible, but it is also central to a healthy church. It is important not to just take a verse for a particular topic but to see the Bible as a whole.",
    liturgos: null,
    musician: "Danny Kurniawan",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 6",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 9,
    title: "The Gospel",
    date: new Date("2023-10-06T20:00:00.000Z"),
    speaker: "Billy Lugito",
    bibleVerse: "Roma 10:9, 17",
    summary:
      "The gospel is the center of Scripture, the center of our faith, and the center of every healthy church. Gospel-centeredness is the cure for the internal challenges that the church faces. Be careful also with the false gospel, where it seems that we have centered on the gospel but in fact it is the wrong gospel. Have we as a fellowship done this point well?",
    liturgos: null,
    musician: "Albertus Pandya",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 1",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 10,
    title: "Expositional Preaching",
    date: new Date("2023-10-13T20:00:00.000Z"),
    speaker: "Pdt. Titus Christanto",
    bibleVerse: "2 Timotius 4 : 2",
    summary:
      "We often hear the term expositional preaching, and this is one of the preaching principles also applied in PERKI. As a non-denominational fellowship, do we really understand what expositional preaching is and why it is included in the Church health indicators?\n",
    liturgos: "Danny Kurniawan",
    musician: "Reggy Irawan",
    multimedia: "Arya Wisnu",
    accommodation: "Oliver Renaldi",
    cookingGroup: "Group 3",
    cleaningGroup: "Group 4",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 11,
    title: "Conversion",
    date: new Date("2023-10-20T18:00:00.000Z"),
    speaker: "Oliver Renaldi",
    bibleVerse: "Kisah Para Rasul 20:21",
    summary:
      "One of the signs of a healthy Church is characterized by the conversion of its members from a proper understanding of the Gospel. In today's worldview that is:\n1. Skeptical that change/repentance is possible\n2. That our nature or personality cannot be changed\n3. A sign of maturity is accepting ourselves as we are, etc.\nTherefore we will look at the Truth about repentance in the Bible\n",
    liturgos: null,
    musician: "Danny Kurniawan",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 2",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 12,
    title: "Evangelism",
    date: new Date("2023-10-27T20:00:00.000Z"),
    speaker: "Ev. Nehemiah Riggruben",
    bibleVerse: "Matius 28:19-20",
    summary:
      "A proper understanding of the Bible and the practice of evangelism is one of the signs of a healthy Church. Sometimes we misinterpret what Evangelism is, Evangelism:\n1. It is not imposing our beliefs on others (1 Corinthians 3:6).\n2. It is not Personal Testimonies (can be part of evangelism, but must contain the gospel)\n3. Not Social Action (Social action without evangelism only leads to humanism)\n4. It is not Apologetics (Apologetics is giving an account of the Christian faith to those who question it. It is defensive, whereas Evangelism is an action to tell the good news)\n5. Not result oriented (Evangelism must be based on a biblical understanding of repentance, some people just don't respond to the gospel, Result oriented can turn a healthy church into a business, Result oriented produces Christians who feel guilty)",
    liturgos: "Albertus Pandya",
    musician: "Clarissa Adelyne",
    multimedia: "Reggy Irawan",
    accommodation: "Jansen Nathanel",
    cookingGroup: "Group 2",
    cleaningGroup: "Group 3",
    fellowshipType: "ChurchService",
  },
  {
    id: 13,
    title: "Evangelism - Part 2",
    date: new Date("2023-11-03T21:00:00.000Z"),
    speaker: "Steffen Josua",
    bibleVerse: "Matius 28:19-20",
    summary:
      "Biblical understanding and evangelistic practices are essential for church health\na. A healthy church is rooted in God-centered messages and motives.\nb. Healthy churches want to end false evangelism.\nc. Healthy churches are committed to sharing a living and dynamic gospel.\nd. Healthy churches understand that God is at work in the gospel.\n\nReflections\na. Is our evangelism motivation correct?\nb. Do you have the compassion to evangelize someone?\nc. What prevents me from evangelizing?\nd.  What should I do to evangelize someone?\ne. How can I evangelize without being offensive or patronizing?\n\n",
    liturgos: null,
    musician: "Felix Arjuna",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 5",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 14,
    title: "Membership",
    date: new Date("2023-11-10T22:00:00.000Z"),
    speaker: "Pdt. Titus Christanto",
    bibleVerse: "Kisah Para Rasul 2:41-47, 1 Korintus 12:12-31",
    summary:
      "God commands us to commit to membership in the local church.\nWhat does the Bible say about membership? \nAs a follower of Christ, membership in a local church is an absolute requirement in fulfilling our obligations towards fellow believers. There are many descriptions of the church in the Bible, such as: the church as a family in Christ (1Tim 5), the church as members of the body of Christ (1Cor 12:21-26), the church as a nation following God, etc. Through these metaphors we can see what callings we have to fulfill as a member of the church. \n1. We are called to rebuke one another as brothers and sisters (1Tim 5:1-2) / as family in Christ\n2. Submit to leaders and each other (Heb 13:17, Eph 5:19-21) / the church as a nation\n3. Live out each other's roles as members of the body of Christ, and thus be a support to the other members of the body (1 Cor 12:21-26, Eph 4:15-16) / the church as members of the body of Christ.\n\nB. Why is it important for us to fulfill this role?\n1. Fulfilling this calling (3 points above) = obeying God's commands written in the bible \n2. Anti-institutional sentimentality has the potential to divide Christianity. There is no way we can fulfill our role as members of the body of Christ if we are not rooted in Christ in a church. \n3. Without membership commitment from its members, the church will not be able to exercise its authority to: baptize people in the name of Christ, rebuke/discipline/even excommunicate its members (important to discuss the context of why discipline is necessary in a church! 1Cor 5, Acts 5:1-11), etc.\n4. Without self-commitment from its members, the church will not be able to fulfill its calling as one body of Christ. ",
    liturgos: "Reggy Irawan",
    musician: "Jordie Yonathan",
    multimedia: "Danny Kurniawan",
    accommodation: "Jordie Yonathan",
    cookingGroup: "Group 5",
    cleaningGroup: "Group 1",
    fellowshipType: "ChurchService",
  },
  {
    id: 15,
    title: "Discipline",
    date: new Date("2023-11-17T22:00:00.000Z"),
    speaker: "Danny Kurniawan",
    bibleVerse: "- ",
    summary: "Coming soon",
    liturgos: null,
    musician: "Albertus Pandya",
    multimedia: null,
    accommodation: null,
    cookingGroup: null,
    cleaningGroup: "Group 2",
    fellowshipType: "BigGroupBibleStudy",
  },
  {
    id: 16,
    title: "Discipleship and Growth",
    date: new Date("2023-11-24T22:00:00.000Z"),
    speaker: "Pdt. John Kusuma",
    bibleVerse: "Yohanes 21:14-22, Matius 4:19-20",
    summary:
      "What is discipleship? Is discipleship in a church important? Why is discipleship in the church important and what exactly is the purpose of discipleship? Who is responsible for discipleship? \n\nDiscipleship is a command given directly by Jesus through the great commission in Matthew 28:19-20 to His disciples, including us believers. Through this series, we will get to know more about what discipleship is, why in a healthy church discipleship must exist, and how growth in a healthy church can be seen through discipleship.\n\nPerhaps as a relevance for us in a fellowship and not a church, it is worth mentioning that discipleship in the community is important too and does not apply only in the church, although in the larger context we are talking about the marks of a healthy church.",
    liturgos: "Toni Setiawan",
    musician: "Danny Kurniawan",
    multimedia: "Victor Jordan",
    accommodation: "Reggy Irawan",
    cookingGroup: "Group 1",
    cleaningGroup: "Group 6",
    fellowshipType: "ChurchService",
  },
];

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const connection = postgres(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  console.log("Seed start");
  await db.insert(schedules).values(scheduleList);
  console.log("Seed done");
};

void main();
