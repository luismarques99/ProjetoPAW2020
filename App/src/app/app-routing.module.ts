import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { InsertTestsComponent } from "./components/insert-tests/insert-tests.component";
import { MyTestsComponent } from "./components/my-tests/my-tests.component";
import { PendingtestsComponent } from "./components/pendingtests/pendingtests.component";
import { PrioritytestsComponent } from "./components/prioritytests/prioritytests.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
// Components
import { TasksComponent } from "./components/tasks/tasks.component";
import { TestSuccessComponent } from "./components/test-success/test-success.component";
import { TestsDetailComponent } from "./components/tests-detail/tests-detail.component";
import { TestsEditComponent } from "./components/tests-edit/tests-edit.component";
import { TestsComponent } from "./components/tests/tests.component";
import { UsersDetailComponent } from "./users-detail/users-detail.component";
import { UsersEditComponent } from "./users-edit/users-edit.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/tasks",
    pathMatch: "full",
  },
  {
    path: "tasks",
    component: TasksComponent,
  },
  {
    path: "private",
    component: InsertTestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "test-success",
    component: TestSuccessComponent,
  },
  {
    path: "tests",
    component: TestsComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
  },
  {
    path: "pendingtests",
    component: PendingtestsComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
  },

  {
    path: "prioritytests",
    component: PrioritytestsComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
  },
  {
    path: "tests-detail/:id",
    component: TestsDetailComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "tests-edit/:id",
    component: TestsEditComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "my-tests",
    component: MyTestsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "update-user",
    component: UsersEditComponent,
  },
  {
    path: "user-detail",
    component: UsersDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
