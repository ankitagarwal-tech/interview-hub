import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import CustomForm from "@/components/Products/CustomForm.tsx";
import {createPortal} from "react-dom";

export default function ExampleModal() {
    return createPortal(<div className='absolute top-0 w-screen h-screen flex justify-center items-center  backdrop-blur-xl'>
        <div className='w-1/2 bg-white rounded'>
            <Dialog>
                <DialogTrigger asChild>
                    <button>Open Modal</button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>User Form</DialogTitle>
                        <DialogDescription>
                            Fill the details and submit the form.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <CustomForm formik={fo}/>
                    </div>

                    <DialogFooter>
                        <button type="submit">Save</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>, document.body)
}