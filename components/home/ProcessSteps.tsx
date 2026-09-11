import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Vous décrivez votre projet",
    description: "Type de logement, véhicule, puissance souhaitée : quelques informations suffisent.",
  },
  {
    n: "02",
    title: "Nous analysons votre installation",
    description: "Étude technique de votre installation électrique existante et de votre configuration.",
  },
  {
    n: "03",
    title: "Vous recevez votre proposition",
    description: "Un devis détaillé et transparent, adapté à votre projet réel.",
  },
  {
    n: "04",
    title: "Notre installateur intervient",
    description: "Un installateur qualifié IRVE réalise la pose, dans les règles de l'art.",
  },
  {
    n: "05",
    title: "Vous rechargez",
    description: "Votre borne est mise en service et vous êtes accompagné après l'installation.",
  },
];

export function ProcessSteps() {
  return (
    <Section id="comment-ca-marche">
      <SectionHeading
        eyebrow="Comment ça marche"
        title="De votre besoin à votre borne installée."
        description="Un parcours simple, pensé pour vous faire gagner du temps à chaque étape."
      />

      <div className="mt-16 flex flex-col">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05}>
            <div className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-ink/8 py-8 md:grid-cols-[100px_1fr_1fr] md:items-center md:gap-10">
              <span className="font-display text-2xl font-semibold text-accent md:text-3xl">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {step.title}
              </h3>
              <p className="text-muted md:text-right">{step.description}</p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-ink/8" />
      </div>
    </Section>
  );
}
