import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  id: z.string().trim().min(1, "ID is required").max(50, "ID must be less than 50 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

interface SubmittedData extends FormData {
  submittedAt: string;
}

const FormHandling = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData({
        ...formData,
        submittedAt: new Date().toLocaleString(),
      });
      setFormData({ name: "", email: "", id: "", password: "" });
    }
  };

  const inputFields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "id", label: "ID", type: "text", placeholder: "Enter your ID" },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Form Handling</h1>
        <p className="text-muted-foreground">
          Complete form with validation and password toggle
        </p>
      </div>

      <form onSubmit={handleSubmit} className="task-card space-y-5">
        {inputFields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof FormData]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`input-field ${
                errors[field.name as keyof FormData]
                  ? "border-destructive focus:ring-destructive"
                  : ""
              }`}
            />
            {errors[field.name as keyof FormData] && (
              <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors[field.name as keyof FormData]}
              </p>
            )}
          </div>
        ))}

        {/* Password Field with Toggle */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`input-field pr-12 ${
                errors.password ? "border-destructive focus:ring-destructive" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Submit Form
        </button>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="task-card mt-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4 text-success">
            <CheckCircle className="h-5 w-5" />
            <h2 className="font-semibold">Form Submitted Successfully!</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{submittedData.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{submittedData.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">ID</span>
              <span className="font-medium text-foreground">{submittedData.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Password</span>
              <span className="font-medium text-foreground">
                {"•".repeat(submittedData.password.length)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Submitted At</span>
              <span className="font-medium text-foreground">
                {submittedData.submittedAt}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormHandling;
