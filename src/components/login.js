import *as yup from 'yup'//* all data
import { Form, Button, } from 'react-bootstrap'
import { useNavigate, } from 'react-router-dom'
import { useFormik } from 'formik' //use to form validation and form handling
import { useState } from 'react'
const validationLoginSchema = yup.object({//object method
    email: yup.string().email().required("email is required"),
    password: yup.string().required("password is required").min(8).max(20)
})
export default function LoginPage() {
    const [serverError, setServerError] = useState([])
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationLoginSchema,//va;idationSchema from formik as proeprty
        validateOnChange: true,//run validation on every input change
        onSubmit: async (values, { resetForm }) => {
            const formData = {
                email: values.email,
                password: values.password
            }
            localStorage.setItem("password", values.password)
            navigate('/slotbook')

        },
    })
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">

                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('email', '')}//set field error on focus
                            isInvalid={formik.touched.email && formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.email && formik.errors.email} {/* Display error message if the field has been touched and has an error */}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('password', '')}
                            isInvalid={formik.touched.password && formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                    </Button>
                </Form>

            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('email', '')}//set field error on focus
                            isInvalid={formik.touched.email && formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.email && formik.errors.email} {/* Display error message if the field has been touched and has an error */}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => formik.setFieldError('password', '')}
                            isInvalid={formik.touched.password && formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Submit
                    </Button>
                </Form>

            </div>
        </>



    )
}