import me from "./assets/me.webp";
import experience from "./assets/experience.webp";
import scholar from "./assets/scholar.webp";
import wisdom from "./assets/wisdom.webp";

export function FrontPage({
  isLangRu,
  setIsLangRu,
}: {
  isLangRu: boolean;
  setIsLangRu: (s: boolean) => void;
}) {
  return (
    <div className="max-w-5xl mx-auto h-screen px-2">
      <div className="">
        <div className="flex">
          <div className="h-12 flex font-bold [&_button]:hover:drop-shadow-sm">
            <button
              className={`${isLangRu ? "text-lg" : ""} w-10`}
              onClick={() => {
                if (!isLangRu) {
                  localStorage.setItem("isLangRu", "true");
                  setIsLangRu(true);
                }
              }}
            >
              RU
            </button>
            <p className="flex justify-center items-center">|</p>
            <button
              className={`${!isLangRu ? "text-lg" : ""} w-10`}
              onClick={() => {
                if (isLangRu) {
                  localStorage.setItem("isLangRu", "false");
                  setIsLangRu(false);
                }
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-4 flex flex-col gap-2">
          <div className="flex-2 flex flex-col justify-around">
            <img width={300} src={me} />
          </div>
          <div className="flex-1 font-myfont">
            <p>{isLangRu ? "Георгий Яшков" : "George Yashkov"}</p>
            <p>{isLangRu ? "25 лет" : "25 y.o."}</p>
            <p>{isLangRu ? "разработчик" : "Software Engineer"}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-2 flex flex-col justify-around gap-6 items-center *:hover:drop-shadow-sm/30">
            <a href="#work_experience">
              <img width={320} height={320} src={experience} />
            </a>
            <a href="#skills_usage">
              <img width={320} height={320} src={scholar} />
            </a>
            <a href="#skills_rating">
              <img width={320} height={320} src={wisdom} />
            </a>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
