import CircleBackground from "./circle-background";

export default function Homepage() {
  return (
    <div className="bg-dark-green-default">
      <div className="overflow-hidden">
        <CircleBackground
          r={90}
          blur
          className={
            "bg-gradient-to-r from-dark-green-500 via-dark-green-100 to-dark-green-500 mix-blend-multiply "
          }
        />
        <CircleBackground
          r={100}
          blur
          className={
            "bg-gradient-to-r from-dark-green-500 via-dark-green-100 to-dark-green-500 mix-blend-multiply "
          }
          duration={25}
          reverse
        />
      </div>

      <div className="flex h-screen flex-col items-center justify-center gap-5 text-light-green-default ">
        <h3 className="uppercase xl:text-4xl 2xl:text-4xl xs:text-xs">
          Welcome to our fellowship
        </h3>
        <h1 className="font-reimbrandt text-[14vw]">Perki Aachen</h1>
        <div className="flex gap-20 xs:gap-4">
          <div className="flex items-center gap-2 uppercase xl:text-4xl 2xl:text-4xl xs:text-[0.6rem]">
            <p>since</p>
            <div className="h-[0.1vw] w-[7vw] bg-light-green-default"></div>
            <p>1990</p>
          </div>
          <div className="uppercase xl:text-4xl 2xl:text-4xl xs:text-[0.6rem]">
            Non-denominational church
          </div>
        </div>
      </div>
      <div className="h-[1px] w-screen bg-light-green-default opacity-10"></div>
    </div>
  );
}
