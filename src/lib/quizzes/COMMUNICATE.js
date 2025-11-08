export const questions = [
  {
    "question": "Which information is used by routers to forward a data packet toward its destination?",
    "answers": [
      " source IP address",
      " destination IP address",
      " source data-link address",
      " destination data-link address"
    ],
    "correct": [
      " destination IP address"
    ],
    "img": null
  },
  {
    "question": "A computer has to send a packet to a destination host in the same LAN. How will the packet be sent?",
    "answers": [
      " The packet will be sent to the default gateway first, and then, depending on the response from the gateway, it may be sent to the destination host.",
      " The packet will be sent directly to the destination host.",
      " The packet will first be sent to the default gateway, and then from the default gateway it will be sent directly to the destination host.",
      " The packet will be sent only to the default gateway."
    ],
    "correct": [
      " The packet will be sent directly to the destination host."
    ],
    "img": null
  },
  {
    "question": "A router receives a packet from the Gigabit 0/0 interface and determines that the packet needs to be forwarded out the Gigabit 0/1 interface. What will the router do next?",
    "answers": [
      " route the packet out the Gigabit 0/1 interface",
      " create a new Layer 2 Ethernet frame to be sent to the destination",
      " look into the ARP cache to determine the destination IP address",
      " look into the routing table to determine if the destination network is in the routing table"
    ],
    "correct": [
      " create a new Layer 2 Ethernet frame to be sent to the destination"
    ],
    "img": null
  },
  {
    "question": "Which IPv4 address can a host use to ping the loopback interface?",
    "answers": [
      " 126.0.0.1",
      " 127.0.0.0",
      " 126.0.0.0",
      " 127.0.0.1"
    ],
    "correct": [
      " 127.0.0.1"
    ],
    "img": null
  },
  {
    "question": "A computer can access devices on the same network but cannot access devices on other networks. What is the probable cause of this problem?",
    "answers": [
      " The cable is not connected properly to the NIC.",
      " The computer has an invalid IP address.",
      " The computer has an incorrect subnet mask.",
      " The computer has an invalid default gateway address."
    ],
    "correct": [
      " The computer has an invalid default gateway address."
    ],
    "img": null
  },
  {
    "question": "Which statement describes a feature of the IP protocol?",
    "answers": [
      " IP encapsulation is modified based on network media.",
      " IP relies on Layer 2 protocols for transmission error control.",
      " MAC addresses are used during the IP packet encapsulation.",
      " IP relies on upper layer services to handle situations of missing or out-of-order packets."
    ],
    "correct": [
      " IP relies on upper layer services to handle situations of missing or out-of-order packets."
    ],
    "img": null
  },
  {
    "question": "Why is NAT not needed in IPv6?​",
    "answers": [
      " Because IPv6 has integrated security, there is no need to hide the IPv6 addresses of internal networks.​",
      " Any host or user can get a public IPv6 network address because the number of available IPv6 addresses is extremely large.​",
      " The problems that are induced by NAT applications are solved because the IPv6 header improves packet handling by intermediate routers.​",
      " The end-to-end connectivity problems that are caused by NAT are solved because the number of routes increases with the number of nodes that are connected to the Internet."
    ],
    "correct": [
      " Any host or user can get a public IPv6 network address because the number of available IPv6 addresses is extremely large.​"
    ],
    "img": null
  },
  {
    "question": "Which parameter does the router use to choose the path to the destination when there are multiple routes available?",
    "answers": [
      " the lower metric value that is associated with the destination network",
      " the lower gateway IP address to get to the destination network",
      " the higher metric value that is associated with the destination network",
      " the higher gateway IP address to get to the destination network"
    ],
    "correct": [
      " the lower metric value that is associated with the destination network"
    ],
    "img": null
  },
  {
    "question": "What are two services provided by the OSI network layer? (Choose two.)",
    "answers": [
      " performing error detection",
      " routing packets toward the destination",
      " encapsulating PDUs from the transport layer",
      " placement of frames on the media",
      " collision detection"
    ],
    "correct": [
      " routing packets toward the destination",
      " encapsulating PDUs from the transport layer"
    ],
    "img": null
  },
  {
    "question": "Within a production network, what is the purpose of configuring a switch with a default gateway address?",
    "answers": [
      " Hosts that are connected to the switch can use the switch default gateway address to forward packets to a remote destination.",
      " A switch must have a default gateway to be accessible by Telnet and SSH.",
      " The default gateway address is used to forward packets originating from the switch to remote networks.",
      " It provides a next-hop address for all traffic that flows through the switch."
    ],
    "correct": [
      " The default gateway address is used to forward packets originating from the switch to remote networks."
    ],
    "img": null
  },
  {
    "question": "What is a basic characteristic of the IP protocol?",
    "answers": [
      " connectionless",
      " media dependent",
      " user data segmentation",
      " reliable end-to-end delivery"
    ],
    "correct": [
      " connectionless"
    ],
    "img": null
  },
  {
    "question": "Which field in the IPv4 header is used to prevent a packet from traversing a network endlessly?",
    "answers": [
      " Time-to-Live",
      " Sequence Number",
      " Acknowledgment Number",
      " Differentiated Services"
    ],
    "correct": [
      " Time-to-Live"
    ],
    "img": null
  },
  {
    "question": "What is one advantage that the IPv6 simplified header offers over IPv4?",
    "answers": [
      " smaller-sized header",
      " little requirement for processing checksums",
      " smaller-sized source and destination IP addresses",
      " efficient packet handling"
    ],
    "correct": [
      " efficient packet handling"
    ],
    "img": null
  },
  {
    "question": "What IPv4 header field identifies the upper layer protocol carried in the packet?",
    "answers": [
      " Protocol",
      " Identification",
      " Version",
      " Differentiated Services"
    ],
    "correct": [
      " Protocol"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. Match the packets with their destination IP address to the exiting interfaces on the router. (Not all targets are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/CCNA-v7-Modul-8-10_Qns-15-Exten-exhibit-1594760765.9811.png"
  },
  {
    "question": "What information does the loopback test provide?",
    "answers": [
      " The TCP/IP stack on the device is working correctly.",
      " The device has end-to-end connectivity.",
      " DHCP is working correctly.",
      " The Ethernet cable is working correctly.",
      " The device has the correct IP address on the network."
    ],
    "correct": [
      " The TCP/IP stack on the device is working correctly."
    ],
    "img": null
  },
  {
    "question": "What routing table entry has a next hop address associated with a destination network?",
    "answers": [
      " directly-connected routes",
      " local routes",
      " remote routes",
      " C and L source routes"
    ],
    "correct": [
      " remote routes"
    ],
    "img": null
  },
  {
    "question": "How do hosts ensure that their packets are directed to the correct network destination?",
    "answers": [
      " They have to keep their own local routing table that contains a route to the loopback interface, a local network route, and a remote default route.​",
      " They always direct their packets to the default gateway, which will be responsible for the packet delivery.",
      " They search in their own local routing table for a route to the network destination address and pass this information to the default gateway.",
      " They send a query packet to the default gateway asking for the best route."
    ],
    "correct": [
      " They have to keep their own local routing table that contains a route to the loopback interface, a local network route, and a remote default route.​"
    ],
    "img": null
  },
  {
    "question": "When transporting data from real-time applications, such as streaming audio and video, which field in the IPv6 header can be used to inform the routers and switches to maintain the same path for the packets in the same conversation?",
    "answers": [
      " Next Header",
      " Flow Label",
      " Traffic Class",
      " Differentiated Services"
    ],
    "correct": [
      " Flow Label"
    ],
    "img": null
  },
  {
    "question": "What statement describes the function of the Address Resolution Protocol?",
    "answers": [
      " ARP is used to discover the IP address of any host on a different network.",
      " ARP is used to discover the IP address of any host on the local network.",
      " ARP is used to discover the MAC address of any host on a different network.",
      " ARP is used to discover the MAC address of any host on the local network."
    ],
    "correct": [
      " ARP is used to discover the MAC address of any host on the local network."
    ],
    "img": null
  },
  {
    "question": "Under which two circumstances will a switch flood a frame out of every port except the port that the frame was received on? (Choose two.)",
    "answers": [
      " The frame has the broadcast address as the destination address.",
      " The destination address is unknown to the switch.",
      " The source address in the frame header is the broadcast address.",
      " The source address in the frame is a multicast address.",
      " The destination address in the frame is a known unicast address."
    ],
    "correct": [
      " The frame has the broadcast address as the destination address.",
      " The destination address is unknown to the switch."
    ],
    "img": null
  },
  {
    "question": "Which statement describes the treatment of ARP requests on the local link?",
    "answers": [
      " They must be forwarded by all routers on the local network.",
      " They are received and processed by every device on the local network.",
      " They are dropped by all switches on the local network.",
      " They are received and processed only by the target device."
    ],
    "correct": [
      " They are received and processed by every device on the local network."
    ],
    "img": null
  },
  {
    "question": "Which destination address is used in an ARP request frame?",
    "answers": [
      " 0.0.0.0",
      " 255.255.255.255",
      " FFFF.FFFF.FFFF",
      " AAAA.AAAA.AAAA",
      " the physical address of the destination host"
    ],
    "correct": [
      " FFFF.FFFF.FFFF"
    ],
    "img": null
  },
  {
    "question": "A network technician issues the arp -d * command on a PC after the router that is connected to the LAN is reconfigured. What is the result after this command is issued?",
    "answers": [
      " The ARP cache is cleared.",
      " The current content of the ARP cache is displayed.",
      " The detailed information of the ARP cache is displayed.",
      " The ARP cache is synchronized with the router interface."
    ],
    "correct": [
      " The ARP cache is cleared."
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. The exhibit shows a small switched network and the contents of the MAC address table of the switch. PC1 has sent a frame addressed to PC3. What will the switch do with the frame?",
    "answers": [
      " The switch will discard the frame.",
      " The switch will forward the frame only to port 2.",
      " The switch will forward the frame to all ports except port 4.",
      " The switch will forward the frame to all ports.",
      " The switch will forward the frame only to ports 1 and 3."
    ],
    "correct": [
      " The switch will forward the frame to all ports except port 4."
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/i275394v1n1_207267.png"
  },
  {
    "question": "Which two types of IPv6 messages are used in place of ARP for address resolution?",
    "answers": [
      " anycast",
      " broadcast",
      " echo reply",
      " echo request",
      " neighbor solicitation",
      " neighbor advertisement"
    ],
    "correct": [
      " neighbor solicitation",
      " neighbor advertisement"
    ],
    "img": null
  },
  {
    "question": "What is the aim of an ARP spoofing attack?",
    "answers": [
      " to flood the network with ARP reply broadcasts",
      " to fill switch MAC address tables with bogus addresses",
      " to associate IP addresses to the wrong MAC address",
      " to overwhelm network hosts with ARP requests"
    ],
    "correct": [
      " to associate IP addresses to the wrong MAC address"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. PC1 attempts to connect to File_server1 and sends an ARP request to obtain a destination MAC address. Which MAC address will PC1 receive in the ARP reply?",
    "answers": [
      " the MAC address of S1",
      " the MAC address of the G0/0 interface on R1",
      " the MAC address of the G0/0 interface on R2",
      " the MAC address of S2",
      " the MAC address of File_server1"
    ],
    "correct": [
      " the MAC address of the G0/0 interface on R1"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2020-01-11_210907.jpg"
  },
  {
    "question": "Where are IPv4 address to Layer 2 Ethernet address mappings maintained on a host computer?",
    "answers": [
      " neighbor table",
      " ARP cache",
      " routing table",
      " MAC address table"
    ],
    "correct": [
      " ARP cache"
    ],
    "img": null
  },
  {
    "question": "What important information is examined in the Ethernet frame header by a Layer 2 device in order to forward the data onward?",
    "answers": [
      " source MAC address",
      " source IP address",
      " destination MAC address",
      " Ethernet type",
      " destination IP address"
    ],
    "correct": [
      " destination MAC address"
    ],
    "img": null
  },
  {
    "question": "Match the commands to the correct actions. (Not all options are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2024-09-17_144554.jpg"
  },
  {
    "question": "A new network administrator has been asked to enter a banner message on a Cisco device. What is the fastest way a network administrator could test whether the banner is properly configured?",
    "answers": [
      " Reboot the device.",
      " Enter CTRL-Z at the privileged mode prompt.",
      " Exit global configuration mode.",
      " Power cycle the device.",
      " Exit privileged EXEC mode and press Enter."
    ],
    "correct": [
      " Exit privileged EXEC mode and press Enter."
    ],
    "img": null
  },
  {
    "question": "A network administrator requires access to manage routers and switches locally and remotely. Match the description to the access method. (Not all options are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2024-09-17_155949.jpg"
  },
  {
    "question": "Match the phases to the functions during the boot up process of a Cisco router. (Not all options are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2024-09-17_145029.jpg"
  },
  {
    "question": "Match the command with the device mode at which the command is entered. (Not all options are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2024-09-17_145429.jpg"
  },
  {
    "question": "What are two functions of NVRAM? (Choose two.)",
    "answers": [
      " to store the routing table",
      " to retain contents when power is removed",
      " to store the startup configuration file",
      " to contain the running configuration file",
      " to store the ARP table"
    ],
    "correct": [
      " to retain contents when power is removed",
      " to store the startup configuration file"
    ],
    "img": null
  },
  {
    "question": "A router boots and enters setup mode. What is the reason for this?",
    "answers": [
      " The IOS image is corrupt.",
      " Cisco IOS is missing from flash memory.",
      " The configuration file is missing from NVRAM.",
      " The POST process has detected hardware failure."
    ],
    "correct": [
      " The configuration file is missing from NVRAM."
    ],
    "img": null
  },
  {
    "question": "The global configuration command ip default-gateway 172.16.100.1 is applied to a switch. What is the effect of this command?",
    "answers": [
      " The switch will have a management interface with the address 172.16.100.1.",
      " The switch can be remotely managed from a host on another network.",
      " The switch can communicate with other hosts on the 172.16.100.0 network.",
      " The switch is limited to sending and receiving frames to and from the gateway 172.16.100.1."
    ],
    "correct": [
      " The switch can be remotely managed from a host on another network."
    ],
    "img": null
  },
  {
    "question": "What happens when the transport input ssh command is entered on the switch vty lines?",
    "answers": [
      " The SSH client on the switch is enabled.",
      " Communication between the switch and remote users is encrypted.",
      " The switch requires a username/password combination for remote access.",
      " The switch requires remote connections via a proprietary client software."
    ],
    "correct": [
      " Communication between the switch and remote users is encrypted."
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A user PC has successfully transmitted packets to www.cisco.com. Which IP address does the user PC target in order to forward its data off the local network?",
    "answers": [
      " 172.24.255.17",
      " 172.24.1.22",
      " 172.20.0.254",
      " 172.24.255.4",
      " 172.20.1.18"
    ],
    "correct": [
      " 172.20.0.254"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2020/01/i207589v1n1_207589.png"
  },
  {
    "question": "Match the configuration mode with the command that is available in that mode. (Not all options are used.)",
    "answers": [
      "Select this to get it right"
    ],
    "correct": [
      "Select this to get it right"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/2024-09-17_145611.jpg"
  },
  {
    "question": "Which three commands are used to set up secure access to a router through a connection to the console interface? (Choose three.)",
    "answers": [
      " interface fastethernet 0/0",
      " line vty 0 4",
      " line console 0",
      " enable secret cisco",
      " login",
      " password cisco"
    ],
    "correct": [
      " line console 0",
      " login",
      " password cisco"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. Consider the IP address configuration shown from PC1. What is a description of the default gateway address?",
    "answers": [
      " It is the IP address of the Router1 interface that connects the company to the Internet.",
      " It is the IP address of the Router1 interface that connects the PC1 LAN to Router1.",
      " It is the IP address of Switch1 that connects PC1 to other devices on the same LAN.",
      " It is the IP address of the ISP network device located in the cloud."
    ],
    "correct": [
      " It is the IP address of the Router1 interface that connects the PC1 LAN to Router1."
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/i206397v1n2_206397.png"
  },
  {
    "question": "Which two functions are primary functions of a router? (Choose two.)",
    "answers": [
      " packet forwarding",
      " microsegmentation",
      " domain name resolution",
      " path selection",
      " flow control"
    ],
    "correct": [
      " packet forwarding",
      " path selection"
    ],
    "img": null
  },
  {
    "question": "What is the effect of using the Router# copy running-config startup-config command on a router?",
    "answers": [
      " The contents of ROM will change.",
      " The contents of RAM will change.",
      " The contents of NVRAM will change.",
      " The contents of flash will change."
    ],
    "correct": [
      " The contents of NVRAM will change."
    ],
    "img": null
  },
  {
    "question": "What will happen if the default gateway address is incorrectly configured on a host?",
    "answers": [
      " The host cannot communicate with other hosts in the local network.",
      " The switch will not forward packets initiated by the host.",
      " The host will have to use ARP to determine the correct address of the default gateway.",
      " The host cannot communicate with hosts in other networks.",
      " A ping from the host to 127.0.0.1 would not be successful."
    ],
    "correct": [
      " The host cannot communicate with hosts in other networks."
    ],
    "img": null
  },
  {
    "question": "What are two potential network problems that can result from ARP operation? (Choose two.)",
    "answers": [
      " Manually configuring static ARP associations could facilitate ARP poisoning or MAC address spoofing.",
      " On large networks with low bandwidth, multiple ARP broadcasts could cause data communication delays.",
      " Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent of intercepting network traffic.",
      " Large numbers of ARP request broadcasts could cause the host MAC address table to overflow and prevent the host from communicating on the network.",
      " Multiple ARP replies result in the switch MAC address table containing entries that match the MAC addresses of hosts that are connected to the relevant switch port."
    ],
    "correct": [
      " On large networks with low bandwidth, multiple ARP broadcasts could cause data communication delays.",
      " Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent of intercepting network traffic."
    ],
    "img": null
  },
  {
    "question": "Open the PT activity. Perform the tasks in the activity instructions and then answer the question.\n\nCCNA 1 v7 Modules 8 – 10 Communicating Between Networks Exam\n\nWhich interfaces in each router are active and operational?",
    "answers": [
      " R1: G0/0 and S0/0/0 R2: G0/0 and S0/0/0",
      " R1: G0/1 and S0/0/1 R2: G0/0 and S0/0/1",
      " R1: G0/0 and S0/0/0 R2: G0/1 and S0/0/0",
      " R1: G0/0 and S0/0/1 R2: G0/1 and S0/0/1"
    ],
    "correct": [
      " R1: G0/0 and S0/0/0 R2: G0/1 and S0/0/0"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/CCNA-1-v7-Modules-8-10-Communicating-Between-Networks-Exam.jpg"
  },
  {
    "question": "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    "answers": [
      " protocol",
      " destination IPv4 address",
      " source IPv4 address",
      " TTL"
    ],
    "correct": [
      " protocol"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header that contains an 8-bit binary value used to determine the priority of each packet?",
    "answers": [
      " differentiated services",
      " destination IPv4 address",
      " source IPv4 address",
      " protocol"
    ],
    "correct": [
      " differentiated services"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header that contains a 32-bit binary value associated with an interface on the sending device?",
    "answers": [
      " source IPv4 address",
      " destination IPv4 address",
      " protocol",
      " TTL"
    ],
    "correct": [
      " source IPv4 address"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header used to detect corruption in the IPv4 header?",
    "answers": [
      " header checksum",
      " source IPv4 address",
      " protocol",
      " TTL"
    ],
    "correct": [
      " header checksum"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Payroll LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nRTR1(config)# interface gi0/1\nRTR1(config-if)# description Connects to the Marketing LAN\nRTR1(config-if)# ip address 10.27.15.17 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface gi0/0\nRTR1(config-if)# description Connects to the Payroll LAN\nRTR1(config-if)# ip address 10.27.14.148 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/0\nRTR1(config-if)# description Connects to the ISP\nRTR1(config-if)# ip address 10.14.15.254 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# interface s0/0/1\nRTR1(config-if)# description Connects to the Head Office WAN\nRTR1(config-if)# ip address 203.0.113.39 255.255.255.0\nRTR1(config-if)# no shutdown\nRTR1(config-if)# end",
    "answers": [
      " 10.27.14.148",
      " 10.27.14.1",
      " 10.14.15.254",
      " 203.0.113.39",
      " 10.27.15.17"
    ],
    "correct": [
      " 10.27.14.148"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header that contains a unicast, multicast, or broadcast address?",
    "answers": [
      " destination IPv4 address",
      " protocol",
      " TTL",
      " header checksum"
    ],
    "correct": [
      " destination IPv4 address"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header used to limit the lifetime of a packet?",
    "answers": [
      " TTL",
      " source IPv4 address",
      " protocol",
      " header checksum"
    ],
    "correct": [
      " TTL"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    "answers": [
      " version",
      " source IPv4 address",
      " protocol",
      " TTL"
    ],
    "correct": [
      " version"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    "answers": [
      " protocol",
      " version",
      " differentiated services",
      " header checksum"
    ],
    "correct": [
      " protocol"
    ],
    "img": null
  },
  {
    "question": "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    "answers": [
      " version",
      " differentiated services",
      " header checksum",
      " TTL"
    ],
    "correct": [
      " version"
    ],
    "img": null
  },
  {
    "question": "What property of ARP causes cached IP-to-MAC mappings to remain in memory longer?",
    "answers": [
      " Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      " A static IP-to-MAC address entry can be entered manually into an ARP table.",
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      " Entries in an ARP table are time-stamped and are purged after the timeout expires."
    ],
    "img": null
  },
  {
    "question": "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    "answers": [
      " A static IP-to-MAC address entry can be entered manually into an ARP table.",
      " Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      " A static IP-to-MAC address entry can be entered manually into an ARP table."
    ],
    "img": null
  },
  {
    "question": "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    "answers": [
      " A static IP-to-MAC address entry can be entered manually into an ARP table.",
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " The source MAC address appears in the header of the Ethernet frame.",
      " The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      " A static IP-to-MAC address entry can be entered manually into an ARP table."
    ],
    "img": null
  },
  {
    "question": "What property of ARP allows hosts on a LAN to send traffic to remote networks?",
    "answers": [
      " Local hosts learn the MAC address of the default gateway.",
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " The source MAC address appears in the header of the Ethernet frame.",
      " The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      " Local hosts learn the MAC address of the default gateway."
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nFloor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.235.234 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.234.114 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.234.235.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.3 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "answers": [
      " 192.168.235.234",
      " 192.168.235.1",
      " 10.234.235.254",
      " 203.0.113.3",
      " 192.168.234.114"
    ],
    "correct": [
      " 192.168.235.234"
    ],
    "img": null
  },
  {
    "question": "What property of ARP forces all Ethernet NICs to process an ARP request?",
    "answers": [
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " The source MAC address appears in the header of the Ethernet frame.",
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame."
    ],
    "img": null
  },
  {
    "question": "What property of ARP causes a reply only to the source sending an ARP request?",
    "answers": [
      " The source MAC address appears in the header of the Ethernet frame.",
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      " The source MAC address appears in the header of the Ethernet frame."
    ],
    "img": null
  },
  {
    "question": "What property of ARP causes the request to be flooded out all ports of a switch except for the port receiving the ARP request?",
    "answers": [
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      " ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame."
    ],
    "img": null
  },
  {
    "question": "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    "answers": [
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      " ARP replies are broadcast on the network when a host receives an ARP request."
    ],
    "correct": [
      " The type field 0x806 appears in the header of the Ethernet frame."
    ],
    "img": null
  },
  {
    "question": "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    "answers": [
      " The type field 0x806 appears in the header of the Ethernet frame.",
      " The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      " Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      " The port-to-MAC address table on a switch has the same entries as the ARP table on the switch."
    ],
    "correct": [
      " The type field 0x806 appears in the header of the Ethernet frame."
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nMain(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 172.29.157.156 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 172.29.156.36 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.156.157.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.177 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end",
    "answers": [
      " 172.29.157.156",
      " 172.29.157.1",
      " 10.156.157.254",
      " 198.51.100.177",
      " 172.29.156.36"
    ],
    "correct": [
      " 172.29.157.156"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nBldgA(config)# interface gi0/1\nBldgA(config-if)# description Connects to the Medical LAN\nBldgA(config-if)# ip address 192.168.191.189 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface gi0/0\nBldgA(config-if)# description Connects to the Client LAN\nBldgA(config-if)# ip address 192.168.190.70 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/0\nBldgA(config-if)# description Connects to the ISP\nBldgA(config-if)# ip address 10.190.191.254 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/1\nBldgA(config-if)# description Connects to the Head Office WAN\nBldgA(config-if)# ip address 198.51.100.213 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# end",
    "answers": [
      " 192.168.191.189",
      " 192.168.191.1",
      " 10.190.191.254",
      " 198.51.100.213",
      " 192.168.190.70"
    ],
    "correct": [
      " 192.168.191.189"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nFloor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 192.168.225.223 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 192.168.224.103 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.224.225.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 203.0.113.246 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "answers": [
      " 192.168.225.223",
      " 192.168.225.1",
      " 10.224.225.254",
      " 203.0.113.246",
      " 192.168.224.103"
    ],
    "correct": [
      " 192.168.225.223"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Manager LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nFloor(config)# interface gi0/1\nFloor(config-if)# description Connects to the Registrar LAN\nFloor(config-if)# ip address 10.118.63.65 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface gi0/0\nFloor(config-if)# description Connects to the Manager LAN\nFloor(config-if)# ip address 10.118.62.196 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/0\nFloor(config-if)# description Connects to the ISP\nFloor(config-if)# ip address 10.62.63.254 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# interface s0/0/1\nFloor(config-if)# description Connects to the Head Office WAN\nFloor(config-if)# ip address 209.165.200.87 255.255.255.0\nFloor(config-if)# no shutdown\nFloor(config-if)# end",
    "answers": [
      " 10.118.62.196",
      " 10.118.62.1",
      " 10.62.63.254",
      " 209.165.200.87",
      " 10.118.63.65"
    ],
    "correct": [
      " 10.118.62.196"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nHQ(config)# interface gi0/1\nHQ(config-if)# description Connects to the Branch LAN\nHQ(config-if)# ip address 172.19.99.99 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface gi0/0\nHQ(config-if)# description Connects to the Store LAN\nHQ(config-if)# ip address 172.19.98.230 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/0\nHQ(config-if)# description Connects to the ISP\nHQ(config-if)# ip address 10.98.99.254 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/1\nHQ(config-if)# description Connects to the Head Office WAN\nHQ(config-if)# ip address 209.165.200.120 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# end",
    "answers": [
      " 172.19.98.230",
      " 172.19.98.1",
      " 10.98.99.254",
      " 209.165.200.120",
      " 172.19.99.99"
    ],
    "correct": [
      " 172.19.98.230"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nHQ(config)# interface gi0/1\nHQ(config-if)# description Connects to the Branch LAN\nHQ(config-if)# ip address 172.20.133.132 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface gi0/0\nHQ(config-if)# description Connects to the Store LAN\nHQ(config-if)# ip address 172.20.132.13 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/0\nHQ(config-if)# description Connects to the ISP\nHQ(config-if)# ip address 10.132.133.254 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# interface s0/0/1\nHQ(config-if)# description Connects to the Head Office WAN\nHQ(config-if)# ip address 198.51.100.156 255.255.255.0\nHQ(config-if)# no shutdown\nHQ(config-if)# end",
    "answers": [
      " 172.20.132.13",
      " 172.20.132.1",
      " 10.132.133.254",
      " 198.51.100.156",
      " 172.20.133.132"
    ],
    "correct": [
      " 172.20.132.13"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nMain(config)# interface gi0/1\nMain(config-if)# description Connects to the Service LAN\nMain(config-if)# ip address 192.168.167.166 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface gi0/0\nMain(config-if)# description Connects to the Engineering LAN\nMain(config-if)# ip address 192.168.166.46 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/0\nMain(config-if)# description Connects to the ISP\nMain(config-if)# ip address 10.166.167.254 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# interface s0/0/1\nMain(config-if)# description Connects to the Head Office WAN\nMain(config-if)# ip address 198.51.100.189 255.255.255.0\nMain(config-if)# no shutdown\nMain(config-if)# end",
    "answers": [
      " 192.168.167.166",
      " 192.168.167.1",
      " 10.166.167.254",
      " 198.51.100.189",
      " 192.168.166.46"
    ],
    "correct": [
      " 192.168.167.166"
    ],
    "img": null
  },
  {
    "question": "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?\nBldgA(config)# interface gi0/1\nBldgA(config-if)# description Connects to the Medical LAN\nBldgA(config-if)# ip address 192.168.201.200 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface gi0/0\nBldgA(config-if)# description Connects to the Client LAN\nBldgA(config-if)# ip address 192.168.200.80 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/0\nBldgA(config-if)# description Connects to the ISP\nBldgA(config-if)# ip address 10.200.201.254 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# interface s0/0/1\nBldgA(config-if)# description Connects to the Head Office WAN\nBldgA(config-if)# ip address 203.0.113.222 255.255.255.0\nBldgA(config-if)# no shutdown\nBldgA(config-if)# end",
    "answers": [
      " 192.168.201.200",
      " 192.168.201.1",
      " 10.200.201.254",
      " 203.0.113.222",
      " 192.168.200.80"
    ],
    "correct": [
      " 192.168.201.200"
    ],
    "img": null
  }
]