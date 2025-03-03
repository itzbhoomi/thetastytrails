import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "0px", // Adjusted for mobile
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          centerPadding: "0px",
          centerMode: false,
        },
      },
    ],
  }

  const slides = [
    {
      image: "pizza.jpg",
      title: "Craving for a Pizza??",
      description:
        "Golden crust, gooey cheese, and a burst of flavors in every bite—just what your cravings ordered! 🍕✨ Why just dream about it when you can make it? Click to unlock the recipe and bring your pizza fantasies to life! Let me know if you want any tweaks! 🚀",
    },
    {
      image: "spring_roll.jpg",
      title: "Unwrap a Little Joy",
      description:
        "Crispy on the outside, packed with flavor on the inside—these spring rolls are a crunchy little bite of heaven! 🥢✨ Why wait? Click to unwrap the recipe and roll up some magic in your kitchen! Let me know if you need any changes! 🚀",
    },
    {
      image: "sushi.jpg",
      title: "Sea-ze the sushi!",
      description:
        "A little rice, a little roll, and a whole lot of yum! Whether you're a chopstick pro or a fork fanatic, this sushi is too good to resist. Click for the recipe and roll into deliciousness!",
    },
    {
      image: "dessert.jpg",
      title: "Sweet Temptations",
      description:
        "Crispy on the outside, packed with flavor on the inside—these spring rolls are a crunchy little bite of heaven! 🥢✨ Why wait? Click to unwrap the recipe and roll up some magic in your kitchen! Let me know if you need any changes! 🚀",
    },
    {
      image: "vadapav.jpg",
      title: "Street Food Magic",
      description:
        "Crispy on the outside, packed with flavor on the inside—these spring rolls are a crunchy little bite of heaven! 🥢✨ Why wait? Click to unwrap the recipe and roll up some magic in your kitchen! Let me know if you need any changes! 🚀",
    },
  ]

  return (
    <div className="my-4 md:my-[30px]">
      <div className="w-full max-w-[95%] md:max-w-[90%] mx-auto">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="px-1 sm:px-2">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] mx-auto rounded-[20px] md:rounded-[40px] bg-white">
                <button
                  className="h-full w-full rounded-[20px] md:rounded-[40px] bg-cover bg-center hover:scale-[1.001] transition duration-300 relative group"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-2 sm:px-4 py-2 rounded-[10px] sm:rounded-[20px] opacity-0 group-hover:opacity-80 transition duration-300 h-[80%] sm:h-[85%] md:h-[370px] w-[90%] sm:w-[85%] md:w-[550px]">
                    <div className="relative z-10 text-white h-full overflow-y-auto">
                      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{slide.title}</h1>
                      <h2 className="text-sm sm:text-base md:text-lg font-bold mb-4">{slide.description}</h2>
                      <button className="bg-white text-black opacity-100 w-full sm:w-[200px] md:w-[300px] h-[30px] rounded-lg mt-2 sm:mt-4">
                        <b>Click me for recipe</b>
                      </button>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

