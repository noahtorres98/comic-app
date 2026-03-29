import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchInput({ value, onChange, onSearch }: SearchInputProps) {
  return (
    <Field orientation="horizontal">
      <Input
        type="search"
        placeholder="Search comics..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <Button onClick={onSearch}>Search</Button>
    </Field>
  );
}
