import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import CourseCard from "../components/CourseCard.jsx";

describe("CourseCard", () => {
  it("renders course title and price", () => {
    const course = {
      _id: "1",
      slug: "react-basics",
      title: "React Basics",
      description: "Learn React",
      category: "frontend",
      difficulty: "beginner",
      price: 49,
      lessons: [{}, {}],
    };
    render(
      <MemoryRouter>
        <CourseCard course={course} />
      </MemoryRouter>
    );
    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("2 lessons")).toBeInTheDocument();
  });
});
