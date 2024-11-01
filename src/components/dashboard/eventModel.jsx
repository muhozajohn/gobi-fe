import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert-dialog";

const Modal = ({ close, title, onSubmit: parentOnSubmit }) => {
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date_schedule: "",
    time: "",
    price: "",
    available_tickets: "",
    image_url: null,
  });
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.description) errors.description = "Description is required";
    if (!values.location) errors.location = "Location is required";
    if (!values.date_schedule) errors.date_schedule = "Date is required";
    if (!values.time) errors.time = "Time is required";
    if (!values.price || values.price <= 0) errors.price = "Valid price is required";
    if (!values.available_tickets || values.available_tickets <= 0) 
      errors.available_tickets = "Valid number of tickets is required";
    return errors;
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "image_url" && files) {
      setFormData(prev => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    // Validate form
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Create FormData object
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image_url" && value instanceof File) {
        form.append("image", value);
      } else if (value !== null) {
        form.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      const result = await response.json();
      if (typeof parentOnSubmit === "function") {
        parentOnSubmit(result);
      }
      close();
    } catch (error) {
      setFormError(error.message || "Failed to save event");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="w-[90vw] md:w-[65vw] lg:w-[55vw] xl:w-[40vw] bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-center flex-1">{title}</h2>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input
              id="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-1">
            <Input
              id="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          <div className="space-y-1">
            <Input
              id="date_schedule"
              type="date"
              value={formData.date_schedule}
              onChange={handleChange}
              className={errors.date_schedule ? "border-red-500" : ""}
            />
            {errors.date_schedule && <p className="text-sm text-red-500">{errors.date_schedule}</p>}
          </div>

          <div className="space-y-1">
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? "border-red-500" : ""}
            />
            {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
          </div>

          <div className="space-y-1">
            <Input
              id="price"
              type="number"
              placeholder="Price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          <div className="space-y-1">
            <Input
              id="available_tickets"
              type="number"
              placeholder="Available Tickets"
              min="1"
              value={formData.available_tickets}
              onChange={handleChange}
              className={errors.available_tickets ? "border-red-500" : ""}
            />
            {errors.available_tickets && <p className="text-sm text-red-500">{errors.available_tickets}</p>}
          </div>

          <div className="col-span-2 space-y-1">
            <Input
              id="image_url"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={errors.image_url ? "border-red-500" : ""}
            />
            {errors.image_url && <p className="text-sm text-red-500">{errors.image_url}</p>}
          </div>

          <div className="col-span-2 space-y-1">
            <textarea
              id="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full p-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="col-span-2 flex gap-4">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;