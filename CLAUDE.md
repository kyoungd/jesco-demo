# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the **JESCO Phase 1** implementation - reports and analytics on banking accounts.

## Phase 1 Scope

**Current Focus**: Building the core working system (4-6 weeks)
- Business onboarding and phone number provisioning
- Missed call to SMS conversion with AI processing  
- Real-time dashboard with conversation management
- Manual takeover from AI conversations
- Basic lead tracking and appointment scheduling

**Excluded from Phase 1**: Advanced analytics, business intelligence, multi-user support, billing systems, phone number compliance features

## Development Philosophy

Our market is small, so we prioritize simplicity and working functionality over complex optimizations:

- **Clean, Readable Code** - Prioritize clarity and maintainability
- **Coding Best Practices** - Strict adherence to best practice standards
- **Easy Implementation** - Simple setup for end users
- **Straightforward Architecture** - Avoid over-engineering
- **Functionality First** - Focus on working features over performance optimization
- **Documentation-Driven** - All implementation follows detailed specifications

### Core Development Principles

1. **Documentation-First Development**
   - All services have complete design specifications in `docs/services/phase-1/`
   - API endpoints, database schemas, and business logic fully documented
   - Implementation must strictly follow design documents

2. **Working System Focus**  
   - Each service group delivers working functionality
   - Weekly milestones with testable outcomes
   - Complete user journey: Registration → Onboarding → Live Conversations

3. **Simple & Reliable**
   - Clear service boundaries with single responsibilities
   - Direct service-to-service communication
   - Basic error handling with proper logging
   - No premature optimization

5. **Scaling and optimization**
   - We are creating software for small segment.  We should not think about scaling or optimization.
   - We must focus on writing clean, reliable, easy to understand and easy to debug code.

## Phase 1 - Create Complete Documentation

### Complete Implementation Specifications

**All Phase 1 services have detailed design documents in `docs/phase-1/`**:

Each service document includes:
- Complete API endpoint specifications with request/response examples
- Database schemas with table structures and relationships  
- Business logic workflows and state management
- Security considerations and error handling
- Testing strategies and performance requirements
- Integration points with other Phase 1 services

### Architecture Documentation
- `docs/architecture/system-architecture.md` - Complete Phase 1 architecture and service breakdown
- Phase 1 service communication patterns and data flow
- Deployment architecture and technology stack decisions
- Also, do not create new documents if you do not have enough information.  Wait until we gathered enough information.

### Project Overview  
- `docs/overview/project-overview.md` - Complete project context and architecture
- `docs/overview/design-overview.md` - Design principles and development patterns
- `docs/overview/use-case-flows.md` - User workflow documentation

## Phase 1 Success Criteria

### Business Requirements  
- New business onboarding completes in < 5 minutes
- System processes missed calls automatically within 5 seconds
- AI handles conversations with seamless human takeover
- Real-time dashboard updates within 1 second
- System supports 10+ concurrent businesses

**Development Focus**: Build Phase 1 completely before considering Phase 2 features. Each service must be production-ready with proper testing, monitoring, and documentation.


### Documentation
root/docs/*.md


### Technoloy
- Google Cloud + Bank Required Security
- typeescript
- next.js
- tailwind.css
- design layout
   <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>JESCO Analytics - UI Demo</title>

   <!-- Inter Font -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   
   <!-- Tailwind CSS -->
   <script src="https://cdn.tailwindcss.com"></script>
   <script>
      tailwind.config = {
         theme: {
         extend: {
            colors: {
               primary: '#0A327F',
               'primary-hover': '#052B6C',
               accent: '#314E8D',
               'bg-light': '#F1F6FB',
               text: '#1A1A1A',
            },
         },
         },
      }
   </script>
   
   <style>
      :root {
         --color-primary: #0A327F;
         --color-primary-hover: #052B6C;
         --color-accent: #314E8D;
         --color-bg-light: #F1F6FB;
         --color-text: #1A1A1A;
      }
      
      body {
         color: var(--color-text);
         font-family: "Inter", Helvetica, Arial, sans-serif;
         line-height: 1.5;
      }
      
      h1, h2, h3 {
         color: var(--color-primary);
         font-weight: 800;
      }
      
      .btn-primary {
         display: inline-flex;
         align-items: center;
         justify-content: center;
         border-radius: 0.5rem;
         padding: 1rem 1.5rem;
         font-weight: 600;
         color: #fff !important;
         text-decoration: none !important;
         background-color: var(--color-primary);
         box-shadow: 0 2px 4px rgba(0,0,0,.1);
         transition: background-color .25s ease;
         border: none;
         cursor: pointer;
      }
      
      .btn-primary:hover {
         background-color: var(--color-primary-hover);
         color: #fff !important;
         text-decoration: none !important;
      }
      
      .btn-secondary {
         display: inline-flex;
         align-items: center;
         justify-content: center;
         border-radius: 0.5rem;
         padding: 1rem 1.5rem;
         font-weight: 600;
         color: var(--color-primary) !important;
         text-decoration: none !important;
         background-color: white;
         border: 2px solid var(--color-primary);
         transition: all .25s ease;
      }
      
      .btn-secondary:hover {
         background-color: var(--color-primary);
         color: #fff !important;
      }
      
      .bg-light {
         background: var(--color-bg-light);
      }
      
      .text-accent {
         color: var(--color-accent);
      }
      
      .demo-card {
         transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .demo-card:hover {
         transform: translateY(-4px);
         box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      }
      
      .gradient-bg {
         background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
      }
   </style>
   </head>
