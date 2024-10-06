import { X } from "lucide-react";
// import {
//   RadioGroup,
//   RadioGroupIndicator,
//   RadioGroupItem,
// } from "@/components/ui/radio-group";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { z } from "zod";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { programmerDetails } from "../http/create-goal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const programmerDetailsSchema = z.object({
  title: z.string().min(1, "Inform the new activity you want to track"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type ProgrammerDetailsSchema = z.infer<typeof programmerDetailsSchema>;

export function ProgrammerDetails() {
  // const queryClient = useQueryClient();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  //   reset,
  // } = useForm<ProgrammerDetailsSchema>({
  //   resolver: zodResolver(programmerDetailsSchema),
  // });

  // async function handleProgrammerDetails({
  //   title,
  //   desiredWeeklyFrequency,
  // }: ProgrammerDetailsSchema) {
  //   try {
  //     await programmerDetails({
  //       title,
  //       desiredWeeklyFrequency,
  //     });

  //     reset();

  //     queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  //     queryClient.invalidateQueries({ queryKey: ["summary"] });

  //     toast.success("Goal create successful");
  //   } catch {
  //     toast.error("Error creating goal!");
  //   }
  // }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Create Goal 🎯</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Add activities that you are willing to add to your weekly routine.
          </DialogDescription>
        </div>

        {/* <form
          onSubmit={handleSubmit(handleProgrammerDetails)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">What is the routine activity?</Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                How many times per week?
              </Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={5}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      {Array.from({ length: 7 }).map((_, i) => {
                        const frequency = String(i + 1);

                        return (
                          <RadioGroupItem key={i} value={frequency}>
                            <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                              {frequency}x on the week
                            </span>
                            <span className="text-lg leading-none">🥱</span>
                          </RadioGroupItem>
                        );
                      })}
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Close
              </Button>
            </DialogClose>

            <Button type="submit" className="flex-1">
              Save
            </Button>
          </div>
        </form> */}
      </div>
    </DialogContent>
  );
}
