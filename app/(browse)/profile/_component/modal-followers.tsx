import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalFollowersProps {
  children: React.ReactNode;
}



export const ModalFollowers = ({ children }: ModalFollowersProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/*<DialogTitle>{label}</DialogTitle>*/}
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
