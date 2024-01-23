import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FieldValues, useForm } from "react-hook-form";
import { date, number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_00),
  category: z.enum(["Groceries", "Entertainment", "Utilities"], {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });
  return (
    <>
      <h1 className="mb-3">Expense Tracker App</h1>
      <hr />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data)
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {/* Use 'discription' here instead of 'description' */}
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="catergory" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.amount && (
            <p className="text-danger">{errors.category?.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
