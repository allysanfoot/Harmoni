import React from 'react'
import JournalEntries from '../components/JournalEntries'
import JournalEntryForm from '../components/JournalEntryForm'

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Journal App</h1>
            <JournalEntryForm />
            <JournalEntries />
        </div>
    )
}

export default HomePage