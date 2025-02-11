type PropItemProps = {
  name: string;
  type: string;
  description: string;
  defaultValue: string;
};

const props: Array<PropItemProps> = [
  {
    name: "root",
    type: "boolean",
    description:
      "Indicates if the autocomplete should be treated as a root component. If true, it will wrap the children with the AutocompleteProvider.",
    defaultValue: "true",
  },
  {
    name: "async",
    type: "boolean",
    description:
      "Async state of the autocomplete. The filter logic is handled by an external source. Sets to false to enable the built-in filtering.",
    defaultValue: "true",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    description: "Default open state of the autocomplete.",
    defaultValue: "false",
  },
  {
    name: "open",
    type: "boolean",
    description: "Open state of the autocomplete (controlled).",
    defaultValue: "undefined",
  },
  {
    name: "searchValue",
    type: "string",
    description: "Search value of the input (controlled).",
    defaultValue: "undefined",
  },
  {
    name: "isLoading",
    type: "boolean",
    description: "Loading state of the autocomplete (controlled).",
    defaultValue: "false",
  },
  {
    name: "isError",
    type: "boolean",
    description: "Error state of the autocomplete (controlled).",
    defaultValue: "false",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Sets open state of the autocomplete (controlled).",
    defaultValue: "undefined",
  },
  {
    name: "onSearchChange",
    type: "(search: string) => void",
    description: "Sets search value of the autocomplete.",
    defaultValue: "undefined",
  },
  {
    name: "onSelectChange",
    type: "(value: string | null) => void",
    description: "Sets selected value of the autocomplete.",
    defaultValue: "undefined",
  },
];

function PropItem({ name, type, description, defaultValue }: PropItemProps) {
  return (
    <li className="flex flex-col gap-y-2 pt-4 first:pt-0">
      <div className="flex flex-wrap items-center">
        <span className="font-bold text-foreground">{name}</span>
        <span className="text-muted-foreground">: {type}</span>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-muted-foreground">Default: {defaultValue}</p>
    </li>
  );
}

export function PropsBlock() {
  return (
    <section className="flex w-full flex-col">
      <h1 className="mb-6 text-xl text-foreground">Props</h1>
      <ul className="flex flex-col space-y-6 divide-y">
        {props.map((prop) => (
          <PropItem key={prop.name} {...prop} />
        ))}
      </ul>
    </section>
  );
}
