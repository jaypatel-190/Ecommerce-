import { useNavigate } from "react-router";

const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "Fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "Shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "Jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "Mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "Laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "Shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "Home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "Books",
  },
];

const Category = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="flex overflow-x-scroll lg:justify-center no-scrollbar">
          <div className="flex " role="list" aria-label="Product categories">
            {category.map((item, index) => {
              return (
                <div key={item.name} className="px-3 lg:px-10" role="listitem">
                  <div
                    onClick={() => navigate(`/category/${item.name}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/category/${item.name}`);
                      }
                    }}
                    className=" w-20 h-20 lg:w-24 lg:h-24  max-w-xs rounded-full  bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 "
                    tabIndex={0}
                    role="button"
                    aria-label={`Browse ${item.name} category`}
                  >
                    <img src={item.image} alt={`${item.name} category`} loading="lazy" />
                  </div>

                  <h1 className=" text-sm lg:text-lg text-center font-medium title-font ">
                    {item.name}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
