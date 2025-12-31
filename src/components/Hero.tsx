import { useEffect, useState , useRef} from "react";
import { cn } from "../lib/util";
import { GridPattern } from "../components/ui/Gridpattern";
import Antigravity from "../components/ui/Antigravity";
import { motion, useScroll, useTransform } from "framer-motion";
import haircut from "../assets/haircut.png";
import i1 from "../assets/pic1.jpg";
import i2 from "../assets/pic2.jpg";
import i3 from "../assets/pic3.jpg";
import i4 from "../assets/pic4.jpg";
import i5 from "../assets/pic5.jpg";

const images = [i1, i2, i3, i4, i5];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);


  const getPosition = (i: number) => {
    const diff = (i - index + images.length) % images.length;

    if (diff === 0) return "translate-y-0 scale-110 z-30 opacity-100";
    if (diff === 1) return "translate-y-20 scale-90 z-20 opacity-60 blur-[1px]";
    if (diff === 2) return "translate-y-40 scale-75 z-10 opacity-40 blur-[2px]";
    if (diff === images.length - 1) return "-translate-y-20 scale-90 z-20 opacity-60 blur-[1px]";
    return "-translate-y-40 scale-75 z-10 opacity-40 blur-[2px]";
  };

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen h-screen sticky top-0 items-center pt-20 overflow-hidden bg-transparent">
  <div className="absolute inset-0 z-0">
    <Antigravity
      count={500}
      magnetRadius={2}
      ringRadius={10}
      waveSpeed={0.25}
      waveAmplitude={1.2}
      particleSize={1.4}
      lerpSpeed={0.06}
      color="rgba(0, 0, 0, 0.4)"
      autoAnimate
      particleVariance={1}
    />
  </div>
  <motion.div
        style={{ scale, opacity }}
        className="w-full h-full relative z-10"
      >
      <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/50 rounded-l-[100px] -z-10 hidden md:block" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            <div className="relative h-[450px] w-[350px] top-5 flex items-center justify-center perspective">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`absolute w-[220px] h-[250px] object-cover rounded-2xl shadow-xl transition-all duration-700 ease-out ${getPosition(i)}`}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-md transform translate-x-[60px]"
            >
              <div className="inline-block border-b border-primary/30 pb-1">
                <span className="text-primary font-medium tracking-wider text-sm uppercase">
                  Lumière — Luxury Hair Cut
                </span>
              </div>

              <h1 className="font-serif text-gray-600 text-[60px] md:text-[60px] font-medium leading-[1.1] text-primary mt-4">
                Reveal <br />
                <span className="italic text-foreground/80">Your Inner Radiance</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed mt-4 tracking-[0.2em]">
                Expert styling, premium treatments, and a sanctuary for your self-care journey. Experience the difference of true artistry.
              </p>

              <div className="flex items-center gap-8 pt-8 border-t border-primary/10 mt-8 w-full">
                <div className="flex items-center gap-8 flex-1">
                  <div>
                    <p className="font-serif text-3xl text-primary">2k+</p>
                    <p className="text-sm text-muted-foreground">Happy Clients</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-primary">15+</p>
                    <p className="text-sm text-muted-foreground">Expert Stylists</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl text-primary">4.9</p>
                    <p className="text-sm text-muted-foreground">Star Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[600px] left-12 w-full hidden md:block z-0">
            <img src={haircut} className="object-cover w-full h-full" />
            <button className="gold-btn absolute w-50 h-20 bottom-35 left-80 bg-primary hover:bg-primary/90  font-semibold text-xl items-center justify-center hover:scale-105 transition-all flex rounded-xl">
              BOOK NOW
            </button>
          </div>

        </div>
      </div>
      </motion.div>
    </section>
  );
}
