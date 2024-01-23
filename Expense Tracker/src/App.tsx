import { useEffect, useState } from "react";
import ExpenseList from "./Components/ExpenseList";
import ExpenseFilter from "./Components/ExpenseFilter";
import ExpenseForm from "./Components/ExpenseForm";

const App = () => {
  useEffect(() => {
    document.title = "Expense Tracker";
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "milk", amount: 45, category: "Groceries" },
    { id: 2, description: "comb", amount: 65, category: "Utilities" },
    { id: 3, description: "cd", amount: 60, category: "Entertainment" },
    { id: 4, description: "aalo", amount: 45, category: "Groceries" },
    { id: 5, description: "yoyo", amount: 100, category: "Entertainment" },
  ]);

  const visbleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expense.amount + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <hr />
        <h6>Filter by catergory</h6>
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visbleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
};

export default App;
