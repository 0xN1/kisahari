import Container from "@/components/home/container";

export default function Loading() {
  return (
    <Container>
      <div></div>

      <img
        src="/icon.svg"
        alt="loading"
        className="w-[vw20] h-[vw20] animate-pulse"
      />

      <div></div>
    </Container>
  );
}
