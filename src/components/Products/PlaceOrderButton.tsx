import {useStore} from "@/stores/cart.store.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import CustomForm from "@/components/Products/CustomForm.tsx";
import {useFormik} from "formik";
import {date, object, string} from "yup";

const ValidationSchema = object({
    firstName: string()
        .required("First Name is required"),
    lastName: string()
        .required("First Name is required"),
    email: string().email('use 123@example.com format')
        .required("Email is required"),
    dob: date().min(new Date('2026/01/01'), "Must be after 26/01/01")
        .required("Date is required")
})

export default function PlaceOrderButton() {

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: '',
            dob: ''
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return <div>
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
                    <CustomForm formik={formik}/>
                </div>

                <DialogFooter>
                    <button type="submit">Save</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
}