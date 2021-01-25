var count = 0;

function polling() {
  console.log(`Background polling ${count++}`);
  setTimeout(polling, 1000 * 10);
}

polling();
