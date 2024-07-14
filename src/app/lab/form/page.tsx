import TextField from "@/ui/inputs/TextField";
import TooltipInfo from "@/ui/utils/TooltipInfo";

export default function Form() {
  return (
    <form>
      <TextField fullWidth label="Nome *" tooltip={<TooltipInfo title="Ajuda kkk hahaha hohoho" />} />
    </form>
  );
}
