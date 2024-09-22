import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";


function Profile() {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Appointments" key="1">
          <Appointments/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Profile" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
