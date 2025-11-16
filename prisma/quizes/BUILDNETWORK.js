export const questions = [
  {
    "question": "Which component is designed to protect against unauthorized communications to and from a computer?",
    "answers": [
      " security center",
      " port scanner",
      " antimalware",
      " antivirus",
      " firewall"
    ],
    "correct": [
      " firewall"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which command will block login attempts on RouterA for a period of 30 seconds if there are 2 failed login attempts within 10 seconds?",
    "answers": [
      " RouterA(config)# login block-for 10 attempts 2 within 30",
      " RouterA(config)# login block-for 30 attempts 2 within 10",
      " RouterA(config)# login block-for 2 attempts 30 within 10",
      " RouterA(config)# login block-for 30 attempts 10 within 2"
    ],
    "correct": [
      " RouterA(config)# login block-for 30 attempts 2 within 10"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is the purpose of the network security accounting function?",
    "answers": [
      " to require users to prove who they are",
      " to determine which resources a user can access",
      " to keep track of the actions of a user",
      " to provide challenge and response questions"
    ],
    "correct": [
      " to keep track of the actions of a user"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What type of attack may involve the use of tools such as nslookup and fping?",
    "answers": [
      " access attack",
      " reconnaissance attack",
      " denial of service attack",
      " worm attack"
    ],
    "correct": [
      " reconnaissance attack"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "prompt": "Match each weakness with an example. (Not all options are used.)",
    "pairs": [
      {
        "id": "1",
        "term": "security policy weakness",
        "desc": "The network administrator did not fully consider the implications of unauthorized users accessing the network."
      },
      {
        "id": "2",
        "term": "configuration weakness",
        "desc": "When implementing an access list on a router, a network engineer did not filter a type of malicous traffic."
      },
      {
        "id": "3",
        "term": "technological weakness",
        "desc": "A nework engineer is examining the operating system of a network device for vulnerabilities."
      },
      {
        "id": "4",
        "term": "step 4",
        "desc": "Client send ACK"
      }
    ],
    "img": null,
    "type": "match"
  },
  {
    "prompt": "Match the type of information security threat to the scenario. (Not all options are used.)",
    "pairs": [
      {
        "id": "1",
        "term": "information theft",
        "desc": "Obtaining trade secret documents illegally"
      },
      {
        "id": "2",
        "term": "identity theft",
        "desc": "Pretending to be someone else by using stolen personal information to apply for a credit card"
      },
      {
        "id": "3",
        "term": "data loss",
        "desc": "Installing cirus code to destroy surveillance recordings for certain days"
      },
      {
        "id": "4",
        "term": "disruption of service",
        "desc": "Preventing users from accessing a website by sending a large number of link requests in a short period"
      }
    ],
    "img": null,
    "type": "match"
  },
  {
    "question": "Which example of malicious code would be classified as a Trojan horse?",
    "answers": [
      " malware that was written to look like a video game",
      " malware that requires manual user intervention to spread between systems",
      " malware that attaches itself to a legitimate program and spreads to other programs when launched",
      " malware that can automatically spread from one system to another by exploiting a vulnerability in the target"
    ],
    "correct": [
      " malware that was written to look like a video game"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is the difference between a virus and a worm?",
    "answers": [
      " Viruses self-replicate but worms do not.",
      " Worms self-replicate but viruses do not.",
      " Worms require a host file but viruses do not.",
      " Viruses hide in legitimate programs but worms do not."
    ],
    "correct": [
      " Worms self-replicate but viruses do not."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which attack involves a compromise of data that occurs between two end points?",
    "answers": [
      " denial-of-service",
      " man-in-the-middle attack",
      " extraction of security parameters",
      " username enumeration"
    ],
    "correct": [
      " man-in-the-middle attack"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which type of attack involves an adversary attempting to gather information about a network to identify vulnerabilities?",
    "answers": [
      " reconnaissance",
      " DoS",
      " dictionary",
      " man-in-the-middle"
    ],
    "correct": [
      " reconnaissance"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "prompt": "Match the description to the type of firewall filtering. (Not all options are used.)",
    "pairs": [
      {
        "id": "1",
        "term": "packet filtering",
        "desc": "prevents or allows access based on the IP or MAC addresses of the source and destination"
      },
      {
        "id": "2",
        "term": "URL filtering",
        "desc": "prevents or allows access based on web addresses or keywords"
      },
      {
        "id": "3",
        "term": "stateful packet inspection",
        "desc": "prevents or allows access based on whether the traffic is in response to requests from internal hosts"
      },
      {
        "id": "4",
        "term": "application filtering",
        "desc": "prevents or allows access based on the port numbers used in the request"
      }
    ],
    "img": null,
    "type": "match"
  },
  {
    "question": "What is the purpose of the network security authentication function?",
    "answers": [
      " to require users to prove who they are",
      " to determine which resources a user can access",
      " to keep track of the actions of a user",
      " to provide challenge and response questions"
    ],
    "correct": [
      " to require users to prove who they are"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which firewall feature is used to ensure that packets coming into a network are legitimate responses to requests initiated from internal hosts?",
    "answers": [
      " stateful packet inspection",
      " URL filtering",
      " application filtering",
      " packet filtering"
    ],
    "correct": [
      " stateful packet inspection"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "When applied to a router, which command would help mitigate brute-force password attacks against the router?",
    "answers": [
      " exec-timeout 30",
      " service password-encryption",
      " banner motd $Max failed logins = 5$",
      " login block-for 60 attempts 5 within 60"
    ],
    "correct": [
      " login block-for 60 attempts 5 within 60"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "prompt": "Identify the steps needed to configure a switch for SSH. The answer order does not matter. (Not all options are used.)",
    "pairs": [
      {
        "id": "1",
        "term": "Step 1",
        "desc": "Create a local user"
      },
      {
        "id": "2",
        "term": "Step 2",
        "desc": "Generate RSA keys."
      },
      {
        "id": "1",
        "term": "Step 3",
        "desc": "Configure a domain name"
      },
      {
        "id": "1",
        "term": "Step 4",
        "desc": "use the login local command"
      },
      {
        "id": "1",
        "term": "Step 5",
        "desc": "use the transport input ssh command"
      }
    ],
    "img": null,
    "type": "match"
  },
  {
    "question": "What feature of SSH makes it more secure than Telnet for a device management connection?",
    "answers": [
      " confidentiality with IPsec",
      " stronger password requirement",
      " random one-time port connection",
      " login information and data encryption"
    ],
    "correct": [
      " login information and data encryption"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is the advantage of using SSH over Telnet?",
    "answers": [
      " SSH is easier to use.",
      " SSH operates faster than Telnet.",
      " SSH provides secure communications to access hosts.",
      " SSH supports authentication for a connection request."
    ],
    "correct": [
      " SSH provides secure communications to access hosts."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is the role of an IPS?",
    "answers": [
      " detecting and blocking of attacks in real time",
      " connecting global threat information to Cisco network security devices",
      " authenticating and validating traffic",
      " filtering of nefarious websites"
    ],
    "correct": [
      " detecting and blocking of attacks in real time"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A user is redesigning a network for a small company and wants to ensure security at a reasonable price. The user deploys a new application-aware firewall with intrusion detection capabilities on the ISP connection. The user installs a second firewall to separate the company network from the public network. Additionally, the user installs an IPS on the internal network of the company. What approach is the user implementing?",
    "answers": [
      " attack based",
      " risk based",
      " structured",
      " layered"
    ],
    "correct": [
      " layered"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is an accurate description of redundancy?",
    "answers": [
      " configuring a router with a complete MAC address database to ensure that all frames can be forwarded to the correct destination",
      " configuring a switch with proper security to ensure that all traffic forwarded through an interface is filtered",
      " designing a network to use multiple virtual devices to ensure that all traffic uses the best path through the internetwork",
      " designing a network to use multiple paths between switches to ensure there is no single point of failure"
    ],
    "correct": [
      " designing a network to use multiple paths between switches to ensure there is no single point of failure"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network administrator is upgrading a small business network to give high priority to real-time applications traffic. What two types of network services is the network administrator trying to accommodate? (Choose two.)",
    "answers": [
      " voice",
      " video",
      " instant messaging",
      " FTP",
      " SNMP"
    ],
    "correct": [
      " voice",
      " video"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is the purpose of a small company using a protocol analyzer utility to capture network traffic on the network segments where the company is considering a network upgrade?",
    "answers": [
      " to identify the source and destination of local network traffic",
      " to capture the Internet connection bandwidth requirement",
      " to document and analyze network traffic requirements on each network segment",
      " to establish a baseline for security analysis after the network is upgraded"
    ],
    "correct": [
      " to document and analyze network traffic requirements on each network segment"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Refer to the exhibit. An administrator is testing connectivity to a remote device with the IP address 10.1.1.1. What does the output of this command indicate?",
    "answers": [
      " Connectivity to the remote device was successful.",
      " A router along the path did not have a route to the destination.",
      " A ping packet is being blocked by a security device along the path.",
      " The connection timed out while waiting for a reply from the remote device."
    ],
    "correct": [
      " A router along the path did not have a route to the destination."
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/i204753v1n2_Question209-1.png",
    "type": "mcq"
  },
  {
    "question": "Which method is used to send a ping message specifying the source address for the ping?",
    "answers": [
      " Issue the ping command from within interface configuration mode.",
      " Issue the ping command without specifying a destination IP address.",
      " Issue the ping command without extended commands.",
      " Issue the ping command after shutting down un-needed interfaces."
    ],
    "correct": [
      " Issue the ping command without specifying a destination IP address."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network engineer is analyzing reports from a recently performed network baseline. Which situation would depict a possible latency issue?",
    "answers": [
      " a change in the bandwidth according to the show interfaces output",
      " a next-hop timeout from a traceroute",
      " an increase in host-to-host ping response times",
      " a change in the amount of RAM according to the show version output"
    ],
    "correct": [
      " an increase in host-to-host ping response times"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which statement is true about Cisco IOS ping indicators?",
    "answers": [
      " ‘!’ indicates that the ping was unsuccessful and that the device may have issues finding a DNS server.",
      " ‘U’ may indicate that a router along the path did not contain a route to the destination address and that the ping was unsuccessful.",
      " ‘.’ indicates that the ping was successful but the response time was longer than normal.",
      " A combination of ‘.’ and ‘!’ indicates that a router along the path did not have a route to the destination address and responded with an ICMP unreachable message.​"
    ],
    "correct": [
      " ‘U’ may indicate that a router along the path did not contain a route to the destination address and that the ping was unsuccessful."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A user reports a lack of network connectivity. The technician takes control of the user machine and attempts to ping other computers on the network and these pings fail. The technician pings the default gateway and that also fails. What can be determined for sure by the results of these tests?",
    "answers": [
      " The NIC in the PC is bad.",
      " The TCP/IP protocol is not enabled.",
      " The router that is attached to the same network as the workstation is down.",
      " Nothing can be determined for sure at this point."
    ],
    "correct": [
      " Nothing can be determined for sure at this point."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network technician issues the C:\\> tracert -6 www.cisco.com command on a Windows PC. What is the purpose of the -6 command option?",
    "answers": [
      " It forces the trace to use IPv6.",
      " It limits the trace to only 6 hops.",
      " It sets a 6 milliseconds timeout for each replay.",
      " It sends 6 probes within each TTL time period."
    ],
    "correct": [
      " It forces the trace to use IPv6."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Why would a network administrator use the tracert utility?",
    "answers": [
      " to determine the active TCP connections on a PC",
      " to check information about a DNS name in the DNS server",
      " to identify where a packet was lost or delayed on a network",
      " to display the IP address, default gateway, and DNS server address for a PC"
    ],
    "correct": [
      " to identify where a packet was lost or delayed on a network"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A ping fails when performed from router R1 to directly connected router R2. The network administrator then proceeds to issue the show cdp neighbors command. Why would the network administrator issue this command if the ping failed between the two routers?",
    "answers": [
      " The network administrator suspects a virus because the ping command did not work.",
      " The network administrator wants to verify Layer 2 connectivity.",
      " The network administrator wants to verify the IP address configured on router R2.",
      " The network administrator wants to determine if connectivity can be established from a non-directly connected network."
    ],
    "correct": [
      " The network administrator wants to verify Layer 2 connectivity."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network engineer is troubleshooting connectivity issues among interconnected Cisco routers and switches. Which command should the engineer use to find the IP address information, host name, and IOS version of neighboring network devices?",
    "answers": [
      " show version",
      " show ip route",
      " show interfaces",
      " show cdp neighbors detail"
    ],
    "correct": [
      " show cdp neighbors detail"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What information about a Cisco router can be verified using the show version command?",
    "answers": [
      " the routing protocol version that is enabled",
      " the value of the configuration register",
      " the operational status of serial interfaces",
      " the administrative distance used to reach networks"
    ],
    "correct": [
      " the value of the configuration register"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which command should be used on a Cisco router or switch to allow log messages to be displayed on remotely connected sessions using Telnet or SSH?",
    "answers": [
      " debug all",
      " logging synchronous",
      " show running-config​",
      " terminal monitor"
    ],
    "correct": [
      " terminal monitor"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which command can an administrator issue on a Cisco router to send debug messages to the vty lines?",
    "answers": [
      " terminal monitor",
      " logging console",
      " logging buffered",
      " logging synchronous"
    ],
    "correct": [
      " terminal monitor"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "By following a structured troubleshooting approach, a network administrator identified a network issue after a conversation with the user. What is the next step that the administrator should take?",
    "answers": [
      " Verify full system functionality.",
      " Test the theory to determine cause.",
      " Establish a theory of probable causes.",
      " Establish a plan of action to resolve the issue."
    ],
    "correct": [
      " Establish a theory of probable causes."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Users are complaining that they are unable to browse certain websites on the Internet. An administrator can successfully ping a web server via its IP address, but cannot browse to the domain name of the website. Which troubleshooting tool would be most useful in determining where the problem is?",
    "answers": [
      " netstat",
      " tracert",
      " nslookup",
      " ipconfig"
    ],
    "correct": [
      " nslookup"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An employee complains that a Windows PC cannot connect to the Internet. A network technician issues the ipconfig command on the PC and is shown an IP address of 169.254.10.3. Which two conclusions can be drawn? (Choose two.)",
    "answers": [
      " The PC cannot contact a DHCP server.",
      " The DNS server address is misconfigured.",
      " The default gateway address is not configured.",
      " The PC is configured to obtain an IP address automatically.",
      " The enterprise network is misconfigured for dynamic routing."
    ],
    "correct": [
      " The PC cannot contact a DHCP server.",
      " The PC is configured to obtain an IP address automatically."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Refer to the exhibit. Host H3 is having trouble communicating with host H1. The network administrator suspects a problem exists with the H3 workstation and wants to prove that there is no problem with the R2 configuration. What tool could the network administrator use on router R2 to prove that communication exists to host H1 from the interface on R2, which is the interface that H3 uses when communicating with remote networks?",
    "answers": [
      " traceroute",
      " show cdp neighbors",
      " Telnet",
      " an extended ping"
    ],
    "correct": [
      " an extended ping"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/i350256v1n4_208086.jpg",
    "type": "mcq"
  },
  {
    "question": "Refer to the exhibit. Baseline documentation for a small company had ping round trip time statistics of 36/97/132 between hosts H1 and H3. Today the network administrator checked connectivity by pinging between hosts H1 and H3 that resulted in a round trip time of 1458/2390/6066. What does this indicate to the network administrator?",
    "answers": [
      " Connectivity between H1 and H3 is fine.",
      " H3 is not connected properly to the network.",
      " Something is causing interference between H1 and R1.",
      " Performance between the networks is within expected parameters.",
      " Something is causing a time delay between the networks."
    ],
    "correct": [
      " Something is causing a time delay between the networks."
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/i350257v1n2_208088.jpg",
    "type": "mcq"
  },
  {
    "question": "Which network service automatically assigns IP addresses to devices on the network?",
    "answers": [
      " DHCP",
      " Telnet",
      " DNS",
      " traceroute"
    ],
    "correct": [
      " DHCP"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which command can an administrator execute to determine what interface a router will use to reach remote networks?",
    "answers": [
      " show arp",
      " show interfaces",
      " show ip route",
      " show protocols"
    ],
    "correct": [
      " show ip route"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "On which two interfaces or ports can security be improved by configuring executive timeouts? (Choose two.)",
    "answers": [
      " Fast Ethernet interfaces",
      " console ports",
      " serial interfaces",
      " vty ports",
      " loopback interfaces"
    ],
    "correct": [
      " console ports",
      " vty ports"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "When configuring SSH on a router to implement secure network management, a network engineer has issued the login local and transport input ssh line vty commands. What three additional configuration actions have to be performed to complete the SSH configuration? (Choose three.)",
    "answers": [
      " Set the user privilege levels.",
      " Generate the asymmetric RSA keys.",
      " Configure the correct IP domain name.",
      " Configure role-based CLI access.",
      " Create a valid local username and password database.",
      " Manually enable SSH after the RSA keys are generated."
    ],
    "correct": [
      " Generate the asymmetric RSA keys.",
      " Configure the correct IP domain name.",
      " Create a valid local username and password database."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is considered the most effective way to mitigate a worm attack?",
    "answers": [
      " Change system passwords every 30 days.",
      " Ensure that all systems have the most current virus definitions.",
      " Ensure that AAA is configured in the network.",
      " Download security updates from the operating system vendor and patch all vulnerable systems."
    ],
    "correct": [
      " Download security updates from the operating system vendor and patch all vulnerable systems."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Which statement describes the ping and tracert commands?",
    "answers": [
      " Tracert shows each hop, while ping shows a destination reply only.",
      " Tracert uses IP addresses; ping does not.",
      " Both ping and tracert can show results in a graphical display.",
      " Ping shows whether the transmission is successful; tracert does not."
    ],
    "correct": [
      " Tracert shows each hop, while ping shows a destination reply only."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A technician is to document the current configurations of all network devices in a college, including those in off-site buildings. Which protocol would be best to use to securely access the network devices?",
    "answers": [
      " FTP",
      " HTTP",
      " SSH",
      " Telnet"
    ],
    "correct": [
      " SSH"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich command has to be configured on the router to complete the SSH configuration?",
    "answers": [
      " service password-encryption",
      " transport input ssh",
      " enable secret class",
      " ip domain-name cisco.com"
    ],
    "correct": [
      " transport input ssh"
    ],
    "img": "https://itexamanswers.net/wp-content/uploads/2019/12/CCNA-1-v7-Modules-16-17-Building-and-Securing-a-Small-Network-Exam.jpg",
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “WhatAreyouwaiting4” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is strong because it uses a passphrase.",
      " It is weak because it is often the default password on new devices.",
      " It is weak since it uses easily found personal information.",
      " It is weak since it is a word that is easily found in the dictionary."
    ],
    "correct": [
      " It is strong because it uses a passphrase."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “pR3s!d7n&0” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      " It is weak because it is often the default password on new devices.",
      " It is weak since it uses easily found personal information.",
      " It is weak since it is a word that is easily found in the dictionary."
    ],
    "correct": [
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “5$7*4#033!” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is strong because it contains 10 numbers and special characters.",
      " It is weak because it is often the default password on new devices.",
      " It is weak since it uses easily found personal information.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "correct": [
      " It is strong because it contains 10 numbers and special characters."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “pR3s!d7n&0” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      " It is weak since it is a word that is easily found in the dictionary.",
      " It is strong because it uses a passphrase.",
      " It is strong because it contains 10 numbers and special characters."
    ],
    "correct": [
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “12345678!” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak because it uses a series of numbers or letters.",
      " It is strong because it uses a passphrase.",
      " It is weak since it is a word that is easily found in the dictionary.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "correct": [
      " It is weak because it uses a series of numbers or letters."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “admin” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak because it is often the default password on new devices.",
      " It is strong because it uses a passphrase.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      " It is strong because it contains 10 numbers and special characters."
    ],
    "correct": [
      " It is weak because it is often the default password on new devices."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “Feb121978” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak because it uses easily found personal information.",
      " It is strong because it uses a passphrase.",
      " It is weak since it is a word that is easily found in the dictionary.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "correct": [
      " It is weak because it uses easily found personal information."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “password” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak because it is a commonly used password.",
      " It is weak since it is a word that is easily found in the dictionary.",
      " It is strong because it uses a passphrase.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "correct": [
      " It is weak because it is a commonly used password."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “RobErT” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak since it uses easily found personal information.",
      " It is strong because it uses a passphrase.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      " It is strong because it contains 10 numbers and special characters."
    ],
    "correct": [
      " It is weak since it uses easily found personal information."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator decides to use “Elizabeth” as the password on a newly installed router. Which statement applies to the password choice?",
    "answers": [
      " It is weak because it uses easily found personal information.",
      " It is strong because it uses a passphrase.",
      " It is weak since it is a word that is easily found in the dictionary.",
      " It is strong because it uses a minimum of 10 numbers, letters and special characters."
    ],
    "correct": [
      " It is weak because it uses easily found personal information."
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network technician is troubleshooting an issue and needs to verify the IP addresses of all interfaces on a router. What is the best command to use to accomplish the task?",
    "answers": [
      " show ip interface brief",
      " nslookup",
      " ipconfig getifaddr en0",
      " show ip route"
    ],
    "correct": [
      " show ip interface brief"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Students who are connected to the same switch are having slower than normal response times. The administrator suspects a duplex setting issue. What is the best command to use to accomplish the task?",
    "answers": [
      " show interfaces",
      " ipconfig getifaddr en0",
      " copy running-config startup-config",
      " show ip nat translations"
    ],
    "correct": [
      " show interfaces"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A user wants to know the IP address of the PC. What is the best command to use to accomplish the task?",
    "answers": [
      " ipconfig",
      " copy running-config startup-config",
      " show interfaces",
      " show ip nat translations"
    ],
    "correct": [
      " ipconfig"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A student wants to save a router configuration to NVRAM. What is the best command to use to accomplish the task?",
    "answers": [
      " copy running-config startup-config",
      " show interfaces",
      " show ip nat translations",
      " show ip route"
    ],
    "correct": [
      " copy running-config startup-config"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A support technician needs to know the IP address of the wireless interface on a MAC. What is the best command to use to accomplish the task?",
    "answers": [
      " ipconfig getifaddr en0",
      " copy running-config startup-config",
      " show interfaces",
      " show ip nat translations"
    ],
    "correct": [
      " ipconfig getifaddr en0"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A network technician is troubleshooting an issue and needs to verify all of the IPv6 interface addresses on a router. What is the best command to use to accomplish the task?",
    "answers": [
      " show ipv6 interface",
      " show interfaces",
      " show ip nat translations",
      " show ip route"
    ],
    "correct": [
      " show ipv6 interface"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "A teacher is having difficulties connecting his PC to the classroom network. He needs to verify that a default gateway is configured correctly. What is the best command to use to accomplish the task?",
    "answers": [
      " ipconfig",
      " copy running-config startup-config",
      " show interfaces",
      " show ip nat translations"
    ],
    "correct": [
      " ipconfig"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "Only employees connected to IPv6 interfaces are having difficulty connecting to remote networks. The analyst wants to verify that IPv6 routing has been enabled. What is the best command to use to accomplish the task?",
    "answers": [
      " show running-config",
      " show interfaces",
      " copy running-config startup-config",
      " show ip nat translations"
    ],
    "correct": [
      " show running-config"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "An administrator is troubleshooting connectivity issues and needs to determine the IP address of a website. What is the best command to use to accomplish the task?",
    "answers": [
      " nslookup",
      " show ipv6 route",
      " show ipv6 interface",
      " copy startup-config running-config"
    ],
    "correct": [
      " nslookup"
    ],
    "img": null,
    "type": "mcq"
  },
  {
    "question": "What is a characteristic of UDP?",
    "answers": [
      " UDP datagrams take the same path and arrive in the correct order at the destination.​",
      " Applications that use UDP are always considered unreliable.​",
      " UDP reassembles the received datagrams in the order they were received.",
      " UDP only passes data to the network when the destination is ready to receive the data."
    ],
    "correct": [
      " UDP reassembles the received datagrams in the order they were received."
    ],
    "img": null,
    "type": "mcq"
  }
]