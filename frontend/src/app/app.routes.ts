import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ChatHistoryModalComponent } from './components/chat-history-modal/chat-history-modal.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chat/:id', component: HomeComponent },
    {path: 'chats/history', component: ChatHistoryModalComponent}
];