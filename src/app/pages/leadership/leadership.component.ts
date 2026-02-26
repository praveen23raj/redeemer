import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.css']
})
export class LeadershipComponent {

  selectedLeader: any = null;

  leaders = [
    
    {
      id: 'karunakaran',
      name: 'Rev. P. Karunakaran',
      title: 'Founder & Senior Pastor',
      image: 'assets/leaders/karunakaran.png',
      shortDescription:
        'Founder of Redeemer Evangelical Prayer House since 2010, faithfully leading the congregation with vision and prayer.'
    },
     {
      id: 'selena',
      name: 'Selena Karunakaran',
      title: 'Pastor',
      image: 'assets/leaders/selena.png',
      shortDescription:
        'Founder of Redeemer Evangelical Prayer House since 2010, faithfully leading the congregation with vision and prayer.'
    },
    {
      id: 'gilbert',
      name: 'Gilbert Raj K',
      title: 'Pastor',
      image: 'assets/leaders/gilbert.png',
      shortDescription: 'Pastor incharge of Redeemer Evangelical Prayer House since 2020.'
    },
      {
      id: 'prakash',
      name: 'Prakash M',
      title: 'Evangelist',
      image: 'assets/leaders/prakash.png',
      shortDescription: 'Evangelist of Redeemer Evangelical Prayer House.'
    },
   {
  id: 'shantha',
  name: 'Shanthi Gilbert',
  title: 'Evangelist',
  image: 'assets/leaders/shantha.png',
  shortDescription:
    'A passionate woman of Christ, devoted to prayer, evangelism, and empowering lives through God’s Word.'
},
{
      id: 'praveen',
      name: 'Praveen Raj V',
      title: 'Believer & Developer',
      image: 'assets/leaders/praveen.jpg',
      shortDescription:
        'Believer and Developer of Redeemer Evangelical Prayer House , serving through technology and faith.'
    }
  ];

  openProfile(leader: any) {
    this.selectedLeader = leader;
    document.body.style.overflow = 'hidden'; 
  }

  closeProfile() {
    this.selectedLeader = null;
    document.body.style.overflow = 'auto';
  }
}
