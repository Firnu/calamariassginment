Recruitment assignment for Calamari company.

Running the project:
1. Navigate to a folder using CLI.
2. git clone https://github.com/Firnu/calamariassginment.git
3. cd calamariassginment
4. git pull
5. npm install
6. npm run dev
7. Dev environment should run at http://localhost:9000/

To run tests: npm run test

Some information:
- Data is not persistent. Every time app resets, there will be a new data.
- 5000 doctors are generated with:
  - 50% of having an avatar,
  - 70% chance of already having votes (from 0 to 150) with random rating
  - 0.5% of already being chosen as favorite
