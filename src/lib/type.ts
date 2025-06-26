export type SelectDropDown = {
  id?: string;
  title: string;
};
export type Todo = {
  id: string;
  text: string;
  priority: SelectDropDown;
  category: SelectDropDown;
  isCompleted: boolean;
};
