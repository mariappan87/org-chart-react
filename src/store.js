import _ from 'lodash';

export const mockData = [{
    id: "user1",
    name: "Mark Hill",
    designation: "Chief Executive Officer",
    team: "Management",
    manager_id:null
  }, {
    id: "user2",
    name: "Joe Linux",
    designation: "Chief Technology Officer",
    team: "Technical",
    manager_id: "user1"
  }, {
    id: "user3",
    name: "Linda May",
    designation: "Chief Business Officer",
    team: "Business",
    manager_id: "user1"
  }, {
    id: "user4",
    name: "John Green",
    designation: "Chief Accounting Officer",
    team: "Finance",
    manager_id: "user1"
  }, {
    id: "user5",
    name: "Alice Lopez",
    designation: "Chief Communications Officer",
    team: "Business",
    manager_id: "user3"
  }, {
    id: "user6",
    name: "Ron Blomquist",
    designation: "Chief Information Security Officer",
    team: "Technical",
    manager_id: "user2"
  }, {
    id: "user7",
    name: "Michael Rubin",
    designation: "Chief Innovation Officer",
    team: "Technical",
    manager_id: "user2"
  }, {
    id: "user8",
    name: "Mary Johnson",
    designation: "Chief Brand Officer",
    team: "Business",
    manager_id: "user3"
  }, {
    id: "user9",
    name: "Kirk Douglas",
    designation: "Chief Business Development Officer",
    team: "Business",
    manager_id: "user3"
  }, {
    id: "user10",
    name: "Erica Reel",
    designation: "Chief Customer Officer",
    team: "Finance",
    manager_id: "user4"
  }
];

const TeamData = _.groupBy(mockData, 'team');

export const filterUsers = (searchTerm) => {
  if (searchTerm.length === 0) {
    return mockData;
  }
  return mockData.filter(obj => Object.values(obj).some(val => val && val.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0));
};

export default TeamData;