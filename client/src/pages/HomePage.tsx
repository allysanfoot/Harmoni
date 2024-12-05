import React, { useState } from 'react'
import JournalEntries from '../components/JournalEntries'
import JournalEntryForm from '../components/JournalEntryForm'
import "../styles/HomePage.css"

const HomePage: React.FC = () => {
    const [refreshEntries, setRefreshEntries] = useState(false);

    // Toggle `refreshEntries` to trigger a re-fetch in JournalEntries
    const handleRefreshEntries = () => {
        setRefreshEntries((prev) => !prev);
    };

    return (
        <div className='homepage'>
            <JournalEntryForm onEntryCreated={handleRefreshEntries}/>
            <JournalEntries refreshTrigger={refreshEntries}/>
        </div>
    )
}

export default HomePage