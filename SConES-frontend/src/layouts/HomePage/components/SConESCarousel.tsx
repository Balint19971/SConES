import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { SConESColors } from "../../../config/Theme";

// TODO change the carouse lbackground to SConESColors.lightBlue
const SConESCarousel = () => {
  return (
    <div className="mt-12 text-gray-700">
      <h2 className="text-3xl font-bold text-gray-800">SConES&trade;</h2>
      <br />
      <Carousel
        className="SConESCarousel"
        navButtonsProps={{
          style: {
            backgroundColor: SConESColors.lightBlue,
          },
        }}
      >
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          );
        })}
      </Carousel>
      <br />
    </div>
  );
};

type Item = {
  Name: string;
  Caption: string;
  contentPosition: "left" | "right" | "middle";
  Items: { Name: string; Image: string }[];
};

interface BannerProps {
  item: Item;
  contentPosition: "left" | "right" | "middle";
  length?: number;
  backgroundColor?: string;
}

const Banner = (props: BannerProps) => {
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems: number = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;
  let items = [];
  const content = (
    <div className="col-span-4" key="content">
      <div className="p-6">
        <h3 className="text-2xl font-bold">{props.item.Name}</h3>
        <p className="text-gray-600">{props.item.Caption}</p>
        {props.item.Name === "Upcoming Conferences" ? (
          <Link
            to="/conferences"
            className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Now
          </Link>
        ) : props.item.Name === "Research Projects" ? (
          <Link
            to="/papers"
            className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Explore Projects
          </Link>
        ) : (
          <button className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Now
          </button>
        )}
      </div>
    </div>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];
    const media = (
      <div className="col-span-4" key={`media-${i}`}>
        <div className="relative">
          <img src={item.Image} alt={item.Name} className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 p-4 bg-gray-800 bg-opacity-50 text-white">
            <p>{item.Name}</p>
          </div>
        </div>
      </div>
    );
    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-12 gap-0">{items}</div>
    </div>
  );
};

const image1 = require("../../../utils/photos/tengrai1.jpeg");
const image2 = require("../../../utils/photos/tengrai2.jpeg");
const image3 = require("../../../utils/photos/tengrai3.jpeg");

const items: Item[] = [
  {
    Name: "Research Projects",
    Caption: "",
    contentPosition: "left",
    Items: [
      {
        Name: "",
        Image: image1,
      },
      {
        Name: "",
        Image: image2,
      },
    ],
  },
  {
    Name: "Upcoming Conferences",
    Caption: "Enhance your experiments!",
    contentPosition: "middle",
    Items: [
      {
        Name: "",
        Image: image3,
      },
      {
        Name: "Test Tubes and Flasks",
        Image: image1,
      },
    ],
  },
  {
    Name: "Academic Resources",
    Caption: "Expand your knowledge horizons!",
    contentPosition: "right",
    Items: [
      {
        Name: "",
        Image: image2,
      },
      {
        Name: "Educational Seminars",
        Image: image3,
      },
    ],
  },
];

export default SConESCarousel;
