import { Settings2Icon } from "lucide-react";

import { Button } from "@/packages/core/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/packages/core/ui/dropdown-menu";
import { Label } from "@/packages/core/ui/label";
import { Switch } from "@/packages/core/ui/switch";

import {
  useSettings,
  type PlaygroundKey,
  type Theme,
} from "./settings.context";

type ThemeOption = { label: string; value: Theme };

const themeOptions: ThemeOption[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

export function SettingsMenu() {
  const { theme, setTheme, playground, setPlayground } = useSettings();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Settings2Icon className="mr-2 h-5 w-5 text-foreground" />
          <span className="hidden md:block">Settings</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-6 min-w-[200px]">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
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

        <DropdownMenuLabel>Playground</DropdownMenuLabel>
        <DropdownMenuGroup>
          {Object.entries(playground).map(([key, value]) => (
            <DropdownMenuItem key={key}>
              <div className="flex items-center space-x-2">
                <Switch
                  id={key}
                  onClick={(e) => e.stopPropagation()}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setPlayground(key as PlaygroundKey, checked)
                  }
                />
                <Label htmlFor={key} className="capitalize">
                  {key}
                </Label>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
