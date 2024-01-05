import { Filter } from "../component/Tutor/Filter";
import { UserList } from "../component/Tutor/UserList";

export default function page() {
  return (
    <div className="px-4">
      <Filter />
      <UserList />
    </div>
  );
}
