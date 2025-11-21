"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import InputField from "@/components/CustomInputField/CustomInput"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { showToast, toastError } from "@/components/CustomToast/CustomToast"

const testSchema = z.object({
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  age: z.number()
    .min(18, "You must be at least 18 years old")
    .max(120, "You must be at most 120 years old"),
  website: z.string().url("Invalid URL").optional(),
})

export default function ValidationTestPage() {
  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      age: 18,
      website: "",
    },
  })

  const onSubmit = (data: z.infer<typeof testSchema>) => {
    showToast({
        variant: "success",
        title: "Form submission successful",
        description: "Your data has been submitted successfully.",
        duration: 10000
      })
    console.log("Form data:", data)
  }

  const onInvalid = (errors: any) => {
    // showToast({
    //   variant: "error",
    //   title: "Form submission failed",
    //   description: "Please fix the errors and try again.",
    //   duration: 10000
    // })
    console.log("Form errors:", errors)
    return(
    toastError("Form submission failed", "Please fix the errors and try again."))
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Form Validation Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit, onInvalid)} 
              className="space-y-6"
            >
              <InputField
                name="username"
                label="Username"
                placeholder="Enter username"
                form={form}
              />

              <InputField
                name="email"
                label="Email"
                placeholder="your@email.com"
                type="email"
                form={form}
              />

              <InputField
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                form={form}
              />

              <InputField
                name="age"
                label="Age"
                placeholder="Enter your age"
                type="number"
                form={form}
              />

              <InputField
                name="website"
                label="Website (optional)"
                placeholder="https://example.com"
                type="url"
                form={form}
              />

              <div className="flex gap-4">
                <Button type="submit">Submit</Button>
                
                {/* Test button that triggers invalid submission */}
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.setValue("username", "a") // Too short
                    form.setValue("email", "invalid") 
                    form.setValue("password", "weak")
                    form.setValue("age", 17)
                    form.trigger() // Manually trigger validation
                  }}
                >
                  Test Invalid Data
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}