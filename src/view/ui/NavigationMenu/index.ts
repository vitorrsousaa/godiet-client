import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu';
import { navigationMenuTriggerStyle } from './navigationMenuTriggerStyle';
import { NavigationRoot } from './Root';
import { NavigationMenuViewport } from './Viewport';

const NavigationMenu = {
  Root: NavigationRoot,
  Viewport: NavigationMenuViewport,
  Content: NavigationMenuContent,
  Trigger: NavigationMenuTrigger,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  Item: NavigationMenuItem,
  List: NavigationMenuList,
};

export { NavigationMenu, navigationMenuTriggerStyle };
