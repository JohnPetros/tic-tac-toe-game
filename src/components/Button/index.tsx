import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export function Button({ title, onClick }: ButtonProps) {
  return (
    <Container type="button" onClick={onClick}>
      {title}
    </Container>
  );
}
