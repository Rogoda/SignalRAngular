import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private hubConnection: HubConnection;
  nick = '';
  public message = 'Hello';
  messages: string[] = [];

  ngOnInit() {
    this.nick = window.prompt('Your name:', 'John');

    const connectionBuilder = new HubConnectionBuilder();
    connectionBuilder.withUrl('http://localhost:5000/chat');

    this.hubConnection = connectionBuilder.build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
        const text = `${nick}: ${receivedMessage}`;
        this.messages.push(text);
      });
    }

    public sendMessage(): void {
      console.log("You have just sed hello");
      this.hubConnection
        .invoke('sendToAll', this.nick, this.message)
        .catch(err => console.error(err));
    }
}