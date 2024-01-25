export interface MealsRepository {
  createMeal(props: Input): Promise<Output>;
  getMealById(id: string): Promise<Output | null>;
  updateMeal(mealId: string, props: Meal): Promise<Output | null>;
  getAllMeals(userId: string): Promise<Output[] | null>;
}
