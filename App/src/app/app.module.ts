import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth.guard";
import { InsertTestsComponent } from "./components/insert-tests/insert-tests.component";
import { MyTestsComponent } from "./components/my-tests/my-tests.component";
import { PendingtestsComponent } from "./components/pendingtests/pendingtests.component";
import { PrioritytestsComponent } from "./components/prioritytests/prioritytests.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { TestSuccessComponent } from "./components/test-success/test-success.component";
import { TestsDetailComponent } from "./components/tests-detail/tests-detail.component";
import { TestsEditComponent } from "./components/tests-edit/tests-edit.component";
import { TestsComponent } from "./components/tests/tests.component";
import { DragDropFileUploadDirective } from "./drag-drop-file-upload.directive";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { UsersComponent } from './users/users.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    TasksComponent,
    InsertTestsComponent,
    TestSuccessComponent,
    TestsComponent,
    TestsDetailComponent,
    TestsEditComponent,
    PendingtestsComponent,
    PrioritytestsComponent,
    MyTestsComponent,
    DragDropFileUploadDirective,
    UsersComponent,
    UsersDeleteComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
