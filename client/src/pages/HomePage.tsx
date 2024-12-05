import React, { useState } from 'react'
import JournalEntries from '../components/JournalEntries'
import JournalEntryForm from '../components/JournalEntryForm'

const HomePage: React.FC = () => {
    const [refreshEntries, setRefreshEntries] = useState(false);

    // Toggle `refreshEntries` to trigger a re-fetch in JournalEntries
    const handleRefreshEntries = () => {
        setRefreshEntries((prev) => !prev);
    };

    return (
        <div>
            <JournalEntryForm onEntryCreated={handleRefreshEntries}/>
            <JournalEntries refreshTrigger={refreshEntries}/>
        </div>
    )
}

export default HomePage