import { Wrapper } from "@/app/(browse)/_components/sidebar/wrapper";
import { Links } from "@/app/(browse)/_components/sidebar/links";
import { BurgerMenu } from "@/app/(browse)/_components/sidebar/burger-menu";
import { Toggle } from "@/app/(browse)/_components/sidebar/toggle";

export const Sidebar = () => {
  return (
    <Wrapper>
      <aside className="hidden md:flex flex-col justify-between pt-4 lg:pt-0 h-full">
        <Toggle />
        <Links />
        <BurgerMenu />
      </aside>
    </Wrapper>
  );
};
