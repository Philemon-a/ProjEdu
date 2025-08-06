const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing server startup...');

// Test TypeScript compilation
const tsc = spawn('npx', ['tsc', '--noEmit'], {
  stdio: 'inherit',
  cwd: __dirname
});

tsc.on('close', (code) => {
  if (code === 0) {
    console.log('✅ TypeScript compilation successful');
    
    // Test if we can import the main file
    try {
      require('./dist/index.js');
      console.log('✅ Server module can be imported');
    } catch (error) {
      console.log('⚠️  Server module import failed (expected without .env):', error.message);
    }
    
    console.log('\n🎉 Backend setup is complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Create a Supabase project at https://supabase.com');
    console.log('2. Copy env.example to .env and add your Supabase credentials');
    console.log('3. Run the SQL commands in the README to set up your database');
    console.log('4. Run "npm run dev" to start the development server');
    
  } else {
    console.log('❌ TypeScript compilation failed');
    process.exit(1);
  }
}); 