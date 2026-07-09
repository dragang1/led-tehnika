
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { getImageUrl } from "@/lib/getImageUrl"



function Slider({ sliderList }) {

    return (

        <Carousel>
            <CarouselContent>
                {sliderList.map((slider, index) => (
                    <CarouselItem key={index}>
                        <div className="relative w-full h-[200px] md:h-[400px]">
                            <Image 
                                src={getImageUrl(slider?.image?.[0]?.url || slider?.url)} 
                                fill
                                alt="slider" 
                                className='object-cover rounded-2xl'
                                sizes="100vw"
                                quality={80}
                                priority={index === 0}
                                fetchPriority={index === 0 ? "high" : "auto"}
                            />
                        </div>
                    </CarouselItem>

                ))}


            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel >


    )
}

export default Slider