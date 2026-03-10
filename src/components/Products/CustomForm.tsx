type TProps = {
    formik: any
}

export default function CustomForm({formik}: TProps) {

    return <div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-80">

            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="border p-2 w-full"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                )}
            </div>

            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="border p-2 w-full"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                )}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="border p-2 w-full"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
            </div>

            <div>
                <input
                    type="date"
                    name="dob"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    className="border p-2 w-full"
                    min='2026-01-01'
                />
                {formik.touched.dob && formik.errors.dob && (
                    <p className="text-red-500 text-sm">{formik.errors.dob}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Submit
            </button>

        </form>
    </div>
}