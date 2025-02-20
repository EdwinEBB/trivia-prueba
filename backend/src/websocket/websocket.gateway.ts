import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RankingService } from 'src/ranking/ranking.service';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server:Server;

  constructor(private readonly rankingservice:RankingService){}

  Afterinit(){
    this.rankingservice.setServer(this.server);
  }

  @SubscribeMessage('getRanking')
  async handleGetRaking(){
    const ranking= await this.rankingservice.getRanking();
    this.server.emit('rankingupdated',ranking);
  }
}
