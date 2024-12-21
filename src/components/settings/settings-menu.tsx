import { Settings2Icon } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useSettings, type Theme } from "./settings-provider";

type ThemeOption = { label: string; value: Theme };

const themeOptions: ThemeOption[] = [
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "light",
    label: "Light",
  },
  {
    value: "system",
    label: "System",
  },
];

export function SettingsMenu() {
  const { theme, setTheme, showOutput, setShowOutput } = useSettings();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Settings2Icon className="mr-2 h-5 w-5 text-foreground" />
          <span className="hidden md:block">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {themeOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={theme === option.value}
              onCheckedChange={() => setTheme(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center space-x-2">
            <Switch
              id="output"
              checked={showOutput}
              onCheckedChange={setShowOutput}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <Label htmlFor="output">Show output</Label>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
