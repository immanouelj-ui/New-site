import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { ProjectSelector } from "@/components/home/ProjectSelector";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { WhyUs } from "@/components/home/WhyUs";
import { PriceFactors } from "@/components/home/PriceFactors";
import { TrustSection } from "@/components/home/TrustSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement text="Votre voiture électrique mérite une recharge adaptée. Pas une prise de fortune, pas un bricolage — une installation pensée pour durer." />
      <ProjectSelector />
      <ProcessSteps />
      <WhyUs />
      <PriceFactors />
      <TrustSection />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
