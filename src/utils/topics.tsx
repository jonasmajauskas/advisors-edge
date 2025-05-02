import React from 'react';
export const financialTopics = [
  {
    "id": "insurance",
    "title": "Insurance",
    "flashcardQuestions": [
      {
        "question": "What are the two phases of annuities?",
        "answer": "Accumulation, Annuitization"
      },
      {
        "question": "How are annuities taxed?",
        "answer": "Tax-deferred growth, LIFO withdrawals"
      },
      {
        "question": "What is the exclusion ratio for annuities?",
        "answer": "Tax-free principal, Taxable earnings"
      },
      {
        "question": "What is the 1035 exchange?",
        "answer": "Tax-free rollover, Like-kind annuity exchange"
      }
    ]
  },
  {
    "id": "accounts",
    "title": "Accounts & Rules",
    "flashcardQuestions": [
      {
        "question": "Explain how long and short margin accounts work.",
        "answer": "Long and short margin accounts allow investors to borrow money or securities to amplify potential returns. In a long margin account, an investor borrows funds from a broker to purchase securities, using the securities as collateral—this enables the investor to control more shares than they could with cash alone. Interest is charged on the borrowed funds. In a short margin account, the investor borrows securities (typically from the broker) and sells them, aiming to repurchase them later at a lower price—profiting from a price decline. The investor must maintain sufficient margin to cover potential losses, and margin calls may occur if the account value drops below regulatory or broker requirements."
      },
      {
        "question": "What types of accounts are not permitted to be margin accounts?",
        "answer": "Custodial accounts (such as UTMA/UGMA accounts), retirement accounts (like IRAs, 401(k)s, and other qualified plans), and most trust accounts unless explicitly authorized are not permitted. These accounts are designed for long-term savings or for the benefit of minors, and borrowing against them would conflict with their intended purpose or violate tax rules."
      },
      {
        "question": "Explain the 3 A's of discretionary trading and what is not discretionary trading.",
        "answer": "The 3 A's of discretionary trading are **Asset**, **Action**, and **Amount**. If a registered representative chooses any of these three on behalf of the client—such as what security to buy (Asset), whether to buy or sell (Action), or how many shares (Amount)—it is considered a discretionary trade and requires written discretionary authority. Simply selecting the time or price of execution does *not* make a trade discretionary; this is known as Time and Price discretion, which does not require written authorization but must be executed on the same day."
      },
      {
        "question": "Explain the Reg T initial margin requirement.",
        "answer": "The Reg T initial margin requirement is a Federal Reserve rule that mandates that an investor must deposit at least 50% of the purchase price of securities when buying on margin. The remaining 50% can be borrowed from the broker. This requirement is designed to limit excessive leverage and protect the financial system."
      },
      {
        "question": "Explain the FINRA maintenance margin requirement.",
        "answer": "The FINRA maintenance margin requirement is the minimum amount of equity an investor must maintain in a margin account after purchasing securities. FINRA rules typically require investors to maintain at least 25% of the total market value of the securities in the account. If the account equity falls below this threshold due to market declines, a margin call may be issued, requiring the investor to deposit additional funds or sell securities to restore the required level."
      },
    ]
  },
  {
    "id": "retirement",
    "title": "Retirement",
    "flashcardQuestions": [
      {
        "question": "Explain what a traditional IRA is, covering contributions, distributions, RMDs, and penalties.",
        "answer": "A Traditional IRA is a tax-advantaged retirement savings account that allows individuals to contribute earned income and deduct those contributions from taxable income. The account grows tax-deferred until withdrawals are made in retirement as ordinary income. Traditional IRAs have required minimum distributions that start on the year the owner turns 73. Penalties include 10% if distributions are taken before the age of 59½ and penalties if RMDs are not distributed."
      },
      {
        "question": "Explain transfers, rollovers, and direct rollovers",
        "answer": "Transfers, rollovers, and direct rollovers are ways to move retirement funds between accounts without triggering taxes or penalties when done correctly. A transfer typically occurs between like-accounts (e.g., IRA to IRA) and is done directly between custodians without the account holder receiving the funds. A rollover involves withdrawing funds from one retirement account and redepositing them into another within 60 days; if not completed in time, it may be taxed and penalized. A direct rollover specifically refers to moving funds from an employer-sponsored plan (like a 401(k)) directly to an IRA or another qualified plan, where the money is sent directly between institutions—avoiding mandatory withholding and ensuring tax-deferred status."
      },
      {
        "question": "Explain what a Roth IRA is, covering contributions, distributions, limitations, and penalties.",
        "answer": "A Roth IRA is a type of individual retirement account that allows for tax-free growth and tax-free withdrawals in retirement. Contributions are made with after-tax dollars, meaning they are not tax-deductible. Qualified distributions—those taken after age 59½ and after the account has been open for at least 5 years—are entirely tax-free. Contribution limits are set annually by the IRS and may be reduced or eliminated based on income, using Modified Adjusted Gross Income (MAGI). For 2024, the contribution limit is $7,000, or $8,000 if age 50 or older. However, direct contributions begin to phase out for single filers with MAGI over $146,000 and are completely phased out at $161,000; for married couples filing jointly, the phase-out starts at $230,000 and ends at $240,000. Early withdrawals of earnings (before age 59½ and without a qualified reason) may incur income taxes and a 10% penalty, while contributions can be withdrawn at any time without taxes or penalties."
      },
      {
        "question": "What is a Backdoor Roth IRA?",
        "answer": "The Backdoor IRA is a legal workaround that allows high-income earners to contribute to a Roth IRA even if they exceed the income limits for direct contributions. It involves first making a non-deductible contribution to a Traditional IRA and then converting that amount into a Roth IRA. Because Roth IRA income limits do not apply to conversions, this allows the funds to grow and be withdrawn tax-free in retirement. However, if the investor has other pre-tax IRA assets, the pro-rata rule applies, which may result in part of the conversion being taxable. This strategy is most effective when the individual has no other Traditional IRA balances."
      },
      {
        "question": "What is a defined benefit plan and who takes on the risk?",
        "answer": "A defined benefit plan is a type of employer-sponsored retirement plan that promises a specific monthly benefit to employees upon retirement, typically based on a formula that factors in salary history and years of service. Unlike defined contribution plans, where the employee bears the investment risk, in a defined benefit plan the employer is responsible for funding the plan and ensuring there is enough money to pay out promised benefits. This means the employer assumes the investment risk and the obligation to meet future retirement payouts, regardless of market performance."
      },
      {
        "question": "What is a defined contribution plan and who takes on the risk?",
        "answer": "A defined contribution plan is a type of retirement plan in which the employee, employer, or both make regular contributions to an individual account for the employee. Common examples include 401(k) and 403(b) plans. The final retirement benefit depends on the amount contributed and the investment performance of the account. Unlike defined benefit plans, the employee bears the investment risk—meaning the value of the retirement savings can fluctuate based on market performance. The employer’s responsibility is limited to making the agreed-upon contributions, not guaranteeing a specific payout at retirement."
      },
      {
        "question": "Explain a 401(k) Plan, covering who it's for, who contributes, 2024 contribution limit, total annual limit, withdrawals, and RMDs.",
        "answer": "A 401(k) plan is a tax-advantaged, employer-sponsored retirement plan primarily designed for employees of private companies. Employees contribute a portion of their salary on a pre-tax basis (traditional) or post-tax basis (Roth 401(k)), and many employers choose to match a percentage of those contributions. For 2024, the employee contribution limit is $23,000, with an additional $7,500 catch-up contribution allowed for those age 50 and older. The total annual contribution limit—including employee and employer contributions—is $69,000 (or $76,500 with catch-up). Withdrawals taken before age 59½ may be subject to income taxes and a 10% early withdrawal penalty unless an exception applies. Required Minimum Distributions (RMDs) must begin at age 73, unless the employee is still working and not a 5% owner of the business."
      },
      {
        "question": "Explain a 403(b) Plan, covering who it's for, who contributes, 2024 contribution limit, total annual limit, withdrawals, and RMDs.",
        "answer": "A 403(b) plan is a tax-advantaged retirement plan available to employees of public schools, tax-exempt organizations, and certain ministers. Like a 401(k), it allows employees to make salary deferrals on a pre-tax (traditional) or post-tax (Roth) basis, and employers may also contribute. For 2024, the employee contribution limit is $23,000, with an additional $7,500 catch-up contribution allowed for those age 50 and older. The total annual contribution limit—including both employee and employer contributions—is $69,000 (or $76,500 with catch-up). Withdrawals before age 59½ may be subject to income taxes and a 10% early withdrawal penalty unless an exception applies. Required Minimum Distributions (RMDs) must begin at age 73, unless the participant is still working and not a 5% owner."
      },
      {
        "question": "Explain a Profit-Sharing Plan, covering who it's for, who contributes, 2024 contribution limit, total annual limit, withdrawals, and RMDs.",
        "answer": "A Profit-Sharing Plan is a type of defined contribution retirement plan that allows employers to make discretionary contributions to employee retirement accounts, regardless of whether the company is profitable in a given year. It is typically used by businesses of all sizes to incentivize and reward employees. Only the employer contributes to the plan; employees do not make direct contributions. For 2024, the total annual contribution limit per employee is the lesser of 100% of compensation or $69,000, with an additional $7,500 catch-up contribution allowed for employees age 50 and older. Contributions are tax-deferred, and withdrawals before age 59½ may be subject to income taxes and a 10% early withdrawal penalty unless an exception applies. Required Minimum Distributions (RMDs) must begin at age 73."
      },
      {
        "question": "Explain a Money Purchase Pension Plan, covering who it's for, who contributes, 2024 contribution limit, total annual limit, withdrawals, and RMDs.",
        "answer": "A SIMPLE IRA (Savings Incentive Match Plan for Employees) is a retirement plan designed for small businesses with 100 or fewer employees who earned at least $5,000 in compensation during the preceding year. Both employers and employees can contribute. In 2024, employees can contribute up to $16,000, with an additional $3,500 catch-up contribution allowed for those age 50 or older. Employers are generally required to either match employee contributions up to 3% of compensation or make a 2% nonelective contribution for all eligible employees. Total contributions cannot exceed these combined limits. Withdrawals before age 59½ are subject to income taxes and typically a 10% penalty—raised to 25% if taken within the first two years of participation. Required Minimum Distributions (RMDs) must begin at age 73."
      },
      {
        "question": "Explain a SIMPLE IRA, covering who it's for, who contributes, 2024 contribution limit, total annual limit, withdrawals, and RMDs.",
        "answer": "A SIMPLE IRA (Savings Incentive Match Plan for Employees) is a retirement plan designed for small businesses with 100 or fewer employees who earned at least $5,000 in compensation during the preceding year. Both employers and employees can contribute. In 2024, employees can contribute up to $16,000, with an additional $3,500 catch-up contribution allowed for those age 50 or older. Employers are generally required to either match employee contributions up to 3% of compensation or make a 2% nonelective contribution for all eligible employees. Total contributions cannot exceed these combined limits. Withdrawals before age 59½ are subject to income taxes and typically a 10% penalty—raised to 25% if taken within the first two years of participation. Required Minimum Distributions (RMDs) must begin at age 73."
      },
      {
        "question": "Explain what a SERP is, covering its purpose, who contributes, eligibility, taxation, portability, and how it differs from an IRA.",
        "answer": "A SERP (Supplemental Executive Retirement Plan) is a non-qualified deferred compensation plan used by employers to provide additional retirement benefits to select key executives. It is entirely employer-funded and offered as a way to retain and reward top talent. Eligibility is typically limited to highly compensated employees or executives. SERPs are not subject to the same IRS contribution limits as qualified plans like IRAs or 401(k)s. Contributions are not taxed to the executive until distributions are received, usually in retirement, at which point they are taxed as ordinary income. SERPs are not portable—benefits generally cannot be rolled into an IRA or taken to another employer. Unlike IRAs, which are individual and tax-advantaged savings accounts open to most people, SERPs are employer-controlled, not funded by the employee, and do not offer the same ownership or portability."
      },
    ]
  },
  {
    "id": "investing-fundamentals",
    "title": "Investing Fundamentals",
    "description": "Investing Fundamentals related questions and strategies.",
    "flashcardQuestions": [
      {
        "question": "What are the 3 characteristics of a bond?",
        "answer": "Par value, Maturity, Coupon rate"
      },
      {
        "question": "What are the 3 types of bond maturities?",
        "answer": "Term, Serial, Balloon"
      },
      {
        "question": "Explain 'bond yield'",
        "answer": "Interest vs value, Return metric"
      },
      {
        "question": "What is the difference between the nominal and current yield?",
        "answer": "Stated rate vs market-based return"
      },
      {
        "question": "Explain 'Yield to Maturity'",
        "answer": "Total return, Held to maturity"
      },
      {
        "question": "What does convexity measure?",
        "answer": "Duration sensitivity, Interest rate curve"
      },
      {
        "question": "Explain bond duration",
        "answer": "Rate sensitivity, Time-weighted value"
      },
      {
        "question": "What is the hierarchy of bond volatility risk?",
        "answer": "Zero-coupon, Long-term, High-yield, Callable, Investment grade, Short-term"
      },
      {
        "question": "Explain the time value of an options contract",
        "answer": "Expiration influence, Subjective market forces"
      },
      {
        "question": "Explain the intrinsic value of call options (in, at, out of the money)",
        "answer": "In the money if stock > strike"
      },
      {
        "question": "Explain the intrinsic value of put options (in, at, out of the money)",
        "answer": "In the money if strike > stock"
      },
      {
        "question": "What is the formula to calculate the IV for a call option?",
        "answer": "IV = Stock price - Strike price"
      },
      {
        "question": "What is the formula to calculate the IV for a put option?",
        "answer": "IV = Strike price - Stock price"
      },
      {
        "question": "How do European and American exercise rules differ?",
        "answer": "European: only at expiration, American: anytime"
      },
      {
        "question": "How does S&P and Moody's Rating Differ?",
        "answer": "S&P: AAA, Moody's: Aaa"
      },
      {
        "question": "What bonds are considered investment grade from a rating perspective?",
        "answer": "BBB/Baa or better"
      },
      {
        "question": "Why can bonds with a shorter duration be seen as a defensive investment?",
        "answer": "Less rate risk, More flexibility"
      },
      {
        "question": "How can a strategy be defined based on bond's duration?",
        "answer": "Short = defensive, Long = aggressive"
      },
      {
        "question": "What are the three key factors in calculating a bond's duration?",
        "answer": "Maturity, Coupon rate, Yield"
      },
      {
        "question": "What is the difference between a bond's duration and convexity?",
        "answer": "Duration = linear, Convexity = curvature"
      },
      {
        "question": "Explain how bonds with higher convexity are affected by rate increases and decreases",
        "answer": "Higher gains with falling rates, Smaller losses with rising rates"
      },
      {
        "question": "Describe the different mutual fund classes including their sales charges, expense ratios, what they're best for and any notes",
        "answer": "Class A: front-load, breakpoints, Class B: back-end, Class C: level load"
      },
      {
        "question": "What is calculated as part of the expense ratio?",
        "answer": "Manager fee, Admin, 12b-1"
      },
      {
        "question": "What makes up the expense ratio costs?",
        "answer": "Manager fee, Admin fees, 12b-1 (marketing)"
      }
    ]
  },
  {
    "id": "securities-&-equity-instruments",
    "title": "Securities & Equity Instruments",
    "description": "Securities & Equity Instruments related questions and strategies.",
    "subtopics": [
      "ADR Creation",
      "Acquisitions",
      "Buybacks",
      "Common Stock",
      "Control Person",
      "Depository Banks",
      "Foreign Markets",
      "Holding Period",
      "Mergers",
      "Preferred Stock",
      "Shareholder Rights",
      "Stock Rights",
      "Stock Splits",
      "Stock Warrants",
      "Volume Limits"
    ],
    "flashcardQuestions": [
      {
        "question": "Define 'security'",
        "answer": "Non-tangible, Transferable, Tradable asset"
      },
      {
        "question": "What are the 4 classifications of common stock?",
        "answer": "Authorized, Issued, Outstanding, Treasury"
      },
      {
        "question": "What are the rights of common shareholders?",
        "answer": "Vote, Transfer, Access to info, Preemptive rights"
      },
      {
        "question": "What are the two types of voting procedures for common stock?",
        "answer": "Statutory, Cumulative"
      },
      {
        "question": "Why choose common stock over preferred stock?",
        "answer": "Growth potential, Voting rights"
      },
      {
        "question": "What are the 6 types of preferred stock?",
        "answer": "Straight, Cumulative, Callable, Convertible, Adjusted-Rate, Participating"
      },
      {
        "question": "What are stock splits?",
        "answer": "Increases shares, Adjusts price, No value change"
      },
      {
        "question": "What are forward splits?",
        "answer": "More shares, Lower price"
      },
      {
        "question": "What are reverse splits?",
        "answer": "Fewer shares, Higher price"
      },
      {
        "question": "Explain what ADRs are, why they are important, and how are they created.",
        "answer": "American Depository Receipts. ADRs are important because they allow U.S. investors to easily invest in foreign companies without dealing with the complexities of international markets. To create an ADR, first, a US depository bank purchases common shares in a foreign company in a foreign company's home market. Second, the purchased shares are deposited in a foreign branch of the bank. Third, the deposits have a receipt issued. Fourth, each ADR represents one or more shares of the foreign company's shares held on deposit."
      },
      {
        "question": "Explain what stock rights are and how they work.",
        "answer": "Stock warrants are long-term instruments that give investors the right to purchase a company’s stock at a fixed price (known as the exercise or strike price) before the warrant expires. Unlike stock options, warrants are issued directly by the company and result in new shares when exercised. Key features of warrants include their typically longer time to expiration (often several years), their leverage potential, and their dilutive effect when exercised. Companies use warrants to attract investors, especially in conjunction with bond or preferred stock offerings, as they act as a 'sweetener' to make the deal more appealing. Warrants can also be used in mergers or to raise capital without immediately issuing new equity."
      },
      {
        "question": "What are the 5 primary actions a company can take?",
        "answer": "Mergers, Acquisitions, Spinoff, Buyback, Tender offer"
      },
      {
        "question": "What two areas are covered by the Rule 144 of the Securities Act of 1933?",
        "answer": "Restricted stock, Control stock"
      },
      {
        "question": "Explain 'restricted stock' as part of Rule 144 of the Securities Act of 1933?",
        "answer": "Private placement, 6-month holding period"
      },
      {
        "question": "Explain 'control stock' as part of Rule 144 of the Securities Act of 1933?",
        "answer": "10%+ ownership, Volume restrictions"
      },
      {
        "question": "What volume limitations apply to control stock as part of Rule 144 of the Securities Act of 1933?",
        "answer": "Greater of 1% or 4-week average volume"
      }
    ]
  },
  {
    "id": "tax,-estate-&-trusts",
    "title": "Tax, Estate & Trusts",
    "description": "Tax, Estate & Trusts related questions and strategies.",
    "subtopics": [
      "Asset Protection",
      "Capital Gains",
      "College Savings",
      "Depreciation",
      "ETFs",
      "Estate Planning",
      "Losses",
      "Mutual Funds",
      "One Account Limit",
      "Pass-through",
      "Passive Income",
      "Prepaid Tuition",
      "Qualified Expenses",
      "REITs",
      "SSI Protection",
      "Tax-free Growth",
      "Taxation",
      "Zero Coupon"
    ],
    "flashcardQuestions": [
      {
        "question": "Explain the tax payments for zero-coupon bonds",
        "answer": "Taxed on imputed interest, Income tax not capital gains"
      },
      {
        "question": "What is the exclusion ratio for annuities?",
        "answer": "Excludes return of principal from tax"
      },
      {
        "question": "How are lump sum and partial withdrawals of annuities taxed?",
        "answer": "Lump sum = growth taxed, Partial = LIFO"
      },
      {
        "question": "What are requirements for the pass-through status?",
        "answer": "90% income distributed, Qualify under Chapter M"
      },
      {
        "question": "How do DPPs pass through losses?",
        "answer": "Offset passive income, Depreciation/depletion deductions"
      },
      {
        "question": "Why are losses from early DPP years useful?",
        "answer": "Offset passive income, Tax deferral"
      },
      {
        "question": "What is a 529 plan?",
        "answer": "Tax-advantaged education savings, State-sponsored"
      },
      {
        "question": "What are the two types of 529 plans?",
        "answer": "Prepaid tuition, College savings"
      },
      {
        "question": "When should you choose college savings plan and when should you choose a prepaid tuition plan?",
        "answer": "Savings = flexibility, Prepaid = in-state tuition lock"
      },
      {
        "question": "What is ABLE?",
        "answer": "Tax-advantaged disability account, One per person, Created under ABLE Act 2014"
      },
      {
        "question": "How does ABLE help with Suplemental Security Income (SSI) and Medicaid?",
        "answer": "Assets \u2264 $100k excluded, SSI suspended\u2014not terminated"
      },
      {
        "question": "What is the conduit theory?",
        "answer": "Pass-through income, Avoid double taxation"
      },
      {
        "question": "Define revocable trust, explain how it works and common uses",
        "answer": "Grantor control, Avoid probate, Includable in estate"
      },
      {
        "question": "Define irrevocable trust, explain how it works and common uses",
        "answer": "No grantor control, Asset protection, Estate exclusion"
      }
    ]
  },
  {
    "id": "business-structures-&-accounts",
    "title": "Business Structures & Accounts",
    "description": "Business Structures & Accounts related questions and strategies.",
    "subtopics": [
      "Bankers' Acceptances",
      "C-Corp",
      "CDs",
      "CP",
      "Custodial",
      "JTWROS",
      "Joint Accounts",
      "LLC",
      "Liquidity",
      "Low Risk",
      "Minor Accounts",
      "Partnership",
      "Repos",
      "S-Corp",
      "Short Maturity",
      "TIC"
    ],
    "flashcardQuestions": [
      {
        "question": "What are the 3 points that define a money market security?",
        "answer": "<1 year, High quality, Liquid"
      },
      {
        "question": "How are money market securities issued?",
        "answer": "At discount, Mature at par"
      },
      {
        "question": "For joint accounts, what are the two types of joint ownership structures?",
        "answer": "TIC, JTWROS"
      },
      {
        "question": "What are the two types of minor accounts?",
        "answer": "Custodial, Education IRA"
      },
      {
        "question": "What are the 7 types of money market securities?",
        "answer": "T-bills, Commercial paper, Negotiable CDs, BA, Repo, Fed Funds, Eurodollars"
      },
      {
        "question": "What is a partnership?",
        "answer": "Two or more owners, Shared profits/losses"
      },
      {
        "question": "What are the types of partnerships?",
        "answer": "General, Limited, LLP"
      },
      {
        "question": "Explain the tax treatment of partnerships",
        "answer": "Pass-through income, K-1 forms"
      },
      {
        "question": "Explain the capital contributions and profit sharing of partnerships",
        "answer": "Cash, property, services, Split per agreement"
      },
      {
        "question": "Why do professional practices use partnerships?",
        "answer": "Licensing limits, Flexibility, Pass-through"
      },
      {
        "question": "Why do investment funds use partnerships?",
        "answer": "Carried interest, Pass-through, Waterfall structure"
      },
      {
        "question": "Why choose a C-corp vs an S-corp?",
        "answer": "Unlimited shareholders, VC eligible, QSBS benefit"
      },
      {
        "question": "For join accounts, what are the two types of join ownership structures can they choose from?",
        "answer": "TIC, JTWROS"
      },
      {
        "question": "What are the two types of minor accounts?",
        "answer": "Custodial (UTMA), Coverdell ESA"
      }
    ]
  },
  {
    "id": "market-operations",
    "title": "Market Operations",
    "description": "Market Operations related questions and strategies.",
    "subtopics": [
      "AON",
      "Agent vs Principal",
      "Cash Settlement",
      "Clearing Agencies",
      "FOK",
      "GTC",
      "IOC",
      "Limit Orders",
      "Market Makers",
      "Market Orders",
      "Registrars",
      "Regular Way",
      "Stop Orders",
      "Transfer Agents"
    ],
    "flashcardQuestions": [
      {
        "question": "Who are the participants in the secondary market?",
        "answer": "Retail, Institutional, Advisors"
      },
      {
        "question": "Explain the differences between market orders, limit orders, and stop orders",
        "answer": "Execution priority, Price control, Triggers"
      },
      {
        "question": "What are the 2 time restrictions for placing orders?",
        "answer": "Day, Good-til-canceled"
      },
      {
        "question": "What are the 3 fill restrictions for placing orders?",
        "answer": "FOK, IOC, AON"
      },
      {
        "question": "What does it mean if a BD acts in a principal capacity and agent capacity?",
        "answer": "Principal = inventory, Agent = match buyers/sellers"
      },
      {
        "question": "What is the difference between regular way and cash settlement?",
        "answer": "T+2 vs same day"
      },
      {
        "question": "Explain clearing agencies, registrars, and transfer agents and their role in the secondary markets",
        "answer": "Clearing: settle trades, Registrar: share count verification, Transfer Agent: update ownership records"
      },
      {
        "question": "What are the 2 time restrictions for placing orders?",
        "answer": "Day Order, Good-til-Canceled (GTC)"
      },
      {
        "question": "What are the 3 fill restrictions for placing orders?",
        "answer": "Fill or Kill, Immediate or Cancel, All or None"
      }
    ]
  },
  {
    "id": "offerings-&-regulations",
    "title": "Offerings & Regulations",
    "description": "Offerings & Regulations related questions and strategies.",
    "subtopics": [
      "Best Efforts",
      "Control Person",
      "Firm Commitment",
      "Holding Period",
      "NAV",
      "POP",
      "Prospectus",
      "Reg A",
      "Reg D",
      "Reg S",
      "Rule 147",
      "Sales Charges",
      "Selling Group",
      "Syndicate",
      "Syndicate Risk",
      "Volume Limits"
    ],
    "flashcardQuestions": [
      {
        "question": "What transaction-based exemptions fall under the Securities Act of 1933?",
        "answer": "Reg D, Rule 144, Reg A, 147A, Reg S"
      },
      {
        "question": "Explain the Rule 147A of the 1933 Securities Act",
        "answer": "Intrastate offerings, Resale restrictions, Nationwide ads allowed"
      },
      {
        "question": "What are the two types of underwriters?",
        "answer": "Best Efforts, Firm Commitment"
      },
      {
        "question": "Explain how Best Efforts Underwriters work",
        "answer": "Acts as agent, No financial risk, All-or-none / Mini-max"
      },
      {
        "question": "Explain how Firm Commitment Underwriters work",
        "answer": "Principal, Buys at discount, Sells at POP"
      },
      {
        "question": "What two areas are covered by the Rule 144 of the Securities Act of 1933?",
        "answer": "Restricted stock, Control stock"
      },
      {
        "question": "Explain 'restricted stock' as part of Rule 144 of the Securities Act of 1933?",
        "answer": "Private placement, 6-month holding period"
      },
      {
        "question": "Explain 'control stock' as part of Rule 144 of the Securities Act of 1933?",
        "answer": "10%+ ownership, Volume restrictions"
      },
      {
        "question": "What volume limitations apply to control stock as part of Rule 144 of the Securities Act of 1933?",
        "answer": "Greater of 1% or 4-week average volume"
      },
      {
        "question": "What is the formula for a public offering price of mutual funds?",
        "answer": "POP = NAV + sales charge"
      },
      {
        "question": "Sales charge is defined as a percentage of POP",
        "answer": "POP basis, Not NAV basis"
      },
      {
        "question": "What are selling groups?",
        "answer": "No risk, Help distribute IPOs, Work under lead underwriters"
      }
    ]
  },
  {
    "id": "government-securities",
    "title": "Government Securities",
    "description": "Government Securities related questions and strategies.",
    "subtopics": [
      "Bills",
      "Bonds",
      "Fannie Mae",
      "Farmer Mac",
      "Freddie Mac",
      "GO Bonds",
      "GSEs",
      "Ginnie Mae",
      "Muni Notes",
      "Notes",
      "Revenue Bonds",
      "STRIPS",
      "Sallie Mae",
      "TIPS",
      "Treasury Receipts"
    ],
    "flashcardQuestions": [
      {
        "question": "What are Treasury Receipts?",
        "answer": "Zero-coupon, Broker-dealer created"
      },
      {
        "question": "What are Treasury STRIPS?",
        "answer": "Separated interest/principal, Zero-coupon"
      },
      {
        "question": "What would someone buy STRIPS?",
        "answer": "Predictable return, No reinvestment risk, Long-term needs"
      },
      {
        "question": "What are the Government-Sponsored Enterprises?",
        "answer": "GSEs, Liquidity in lending, Fannie, Freddie, Sallie, etc."
      },
      {
        "question": "What does it mean to guarantee a loan?",
        "answer": "Promise repayment, Investor protection"
      },
      {
        "question": "What are General Obligation bonds?",
        "answer": "Tax-backed, Low risk, Voter approval"
      },
      {
        "question": "What are Revenue bonds?",
        "answer": "Project-backed, Higher risk, No vote needed"
      },
      {
        "question": "What are Muni notes?",
        "answer": "Short-term, Temporary financing"
      },
      {
        "question": "What are the 5 types of Muni notes?",
        "answer": "TANs, RANs, BANs, GANs, CLNs"
      },
      {
        "question": "What are the types of treasury securities?",
        "answer": "T-Bills, T-Notes, T-Bonds, TIPS"
      }
    ]
  },
  {
    "id": "debt-management",
    "title": "Debt Management",
    "description": "Debt Management related questions and strategies.",
    "subtopics": [
      "Convertible",
      "Debenture",
      "High Yield",
      "Income Bonds",
      "Preferred vs Common",
      "Senior Debt",
      "Unsecured Creditors"
    ],
    "flashcardQuestions": [
      {
        "question": "What is the distribution order for liquidation and bankruptcy?",
        "answer": "1. Secured creditors, 2. Admin claim holders, 3. Senior unsecured creditors, 4. Junior unsecured creditors, 5. Income bonds, 6. Preferred stock, 7. Common stock"
      },
      {
        "question": "What are the types of corporate bonds (7)?",
        "answer": "Debenture, Subordinated, Income, Convertible, High-Yield, Zero, Collateral"
      }
    ]
  },
  {
    "id": "miscellaneous",
    "title": "Miscellaneous & Overflow",
    "description": "Topics not covered in the main categories.",
    "subtopics": [
      "529",
      "ABLE",
      "BE Calculations",
      "Broker Roles",
      "C-Corp",
      "Call/Put",
      "Cash vs Stock Dividends",
      "Clearing",
      "Combo Privilege",
      "DERP",
      "Exchange Privilege",
      "Expense Ratio",
      "Fund Types",
      "Intrinsic Value",
      "Investment Company Act 1940",
      "Irrevocable",
      "LOI",
      "Partnerships",
      "Premium",
      "Pricing",
      "Proxy Voting",
      "ROA",
      "Revocable",
      "S-Corp",
      "SSI impact",
      "Securities Act 1933",
      "Securities Exchange Act 1934",
      "Transfer Agents",
      "Uses"
    ],
    "flashcardQuestions": [
      {
        "question": "What is DERP in terms of dividends?",
        "answer": "Declaration date, Ex-dividend date, Record date, Payment date"
      },
      {
        "question": "Explain how cash and stock dividends work, their distribution cycle, taxation, advantages, and disadvantages.",
        "answer": "Cash vs stock, Tax implications, Distribution timeline"
      },
      {
        "question": "Explain 'proxy voting'",
        "answer": "Limited power of attorney, Voting rights delegation"
      },
      {
        "question": "Explain 'proxy solicitation'",
        "answer": "Proxy collection, Shareholder engagement"
      },
      {
        "question": "What are the components of an options contract?",
        "answer": "Strike, Premium, Expiration, Type"
      },
      {
        "question": "What is the formula for calculating an option's premium?",
        "answer": "Intrinsic value, Time value"
      },
      {
        "question": "Explain the intrinsic value of an options contract",
        "answer": "Call: Stock - Strike, Put: Strike - Stock"
      },
      {
        "question": "What is the Breakeven (BE) for call and put options?",
        "answer": "Call = XP + premium, Put = XP - premium"
      },
      {
        "question": "How are Investment Companies defined by the Investment Company Act of 1940?",
        "answer": "Pools investor money, Invests in securities"
      },
      {
        "question": "What are unit investment trusts (UITs)?",
        "answer": "Fixed portfolio, No active management, Defined maturity"
      },
      {
        "question": "What are management investment companies?",
        "answer": "Actively managed, Defined objective"
      },
      {
        "question": "Explain the difference between Mutual Funds and ETFs",
        "answer": "ETFs trade on exchanges, Mutual funds redeem at NAV"
      },
      {
        "question": "Explain how breakpoints work",
        "answer": "Sales charge discount, Volume-based"
      },
      {
        "question": "What is calculated as part of the expense ratio?",
        "answer": "Manager fee, 12b-1 fees, Admin fees"
      },
      {
        "question": "Explain what forward pricing is",
        "answer": "Next NAV pricing, Mutual fund order rule"
      },
      {
        "question": "What is the conduit theory?",
        "answer": "Pass-through income, Avoid double tax"
      },
      {
        "question": "Define revocable trust, explain how it works and common uses",
        "answer": "Grantor control, No asset protection, Avoid probate"
      },
      {
        "question": "Define irrevocable trust, explain how it works and common uses",
        "answer": "No grantor control, Asset protection, Estate reduction"
      },
      {
        "question": "What the Securities Act of 1933?",
        "answer": "Regulates IPOs, Disclosure requirement"
      },
      {
        "question": "What is the Securities Exchange Act of 1934?",
        "answer": "Secondary market, SEC authority"
      },
      {
        "question": "What is the Investment Company Act of 1940?",
        "answer": "Regulates funds, Governance rules"
      },
      {
        "question": "What are selling groups?",
        "answer": "Helps distribute IPO, No risk for unsold shares"
      },
      {
        "question": "Describe the IPO filing process",
        "answer": "S-1 filing, Cooling-off, Final prospectus"
      },
      {
        "question": "What is a 529 plan?",
        "answer": "Tax-advantaged, Education expenses"
      },
      {
        "question": "What are the two types of 529 plans?",
        "answer": "Prepaid tuition, College savings"
      },
      {
        "question": "What is ABLE?",
        "answer": "Disabled beneficiaries, Tax-free growth"
      },
      {
        "question": "How does ABLE help with Supplemental Security Income (SSI) and Medicaid?",
        "answer": "Exempt savings, Up to $100k allowed"
      },
      {
        "question": "What is a partnership?",
        "answer": "Shared ownership, Split profits/losses"
      },
      {
        "question": "Explain the tax treatment of partnerships",
        "answer": "Pass-through income, No entity tax"
      },
      {
        "question": "Why do professional practices use partnerships?",
        "answer": "Licensing restrictions, Profit flexibility"
      },
      {
        "question": "Why choose a C-corp vs an S-corp?",
        "answer": "Unlimited shareholders, Preferred for VC"
      },
      {
        "question": "What is the difference between regular way and cash settlement?",
        "answer": "T+2, Same day"
      },
      {
        "question": "Explain how Fully Disclosed Firms, Carrying Firms, and Prime Brokers work",
        "answer": "Client handling, Custody, Institutional support"
      },
      {
        "question": "Explain clearing agencies, registrars, and transfer agents and their role in the secondary markets",
        "answer": "Settle trades, Record ownership, Prevent over-issuance"
      },
      {
        "question": "Explain how letters of intent, right of accumulation, combination privilege, and exchange privilege can reduce the sales charge",
        "answer": "LOI: future discount, ROA: past+present counts, Exchange: move within family, Combo: across funds"
      }
    ]
  }
]
export const clientProfiles = [{
  id: 'retiree',
  name: 'Retirement-Focused Client',
  description: 'Focused on retirement planning and income strategies',
  concerns: ['Running out of money', 'Social Security optimization', 'Healthcare costs']
}, {
  id: 'young',
  name: 'Young Professional',
  description: 'Early career with focus on building wealth',
  concerns: ['Student loan debt', 'Starting to invest', 'Buying first home']
}, {
  id: 'business',
  name: 'Business Owner',
  description: 'Entrepreneur with complex financial situation',
  concerns: ['Business succession', 'Tax optimization', 'Risk management']
}, {
  id: 'family',
  name: 'Family Planner',
  description: 'Focus on providing for family and future generations',
  concerns: ['College planning', 'Life insurance', 'Estate planning']
}];
export const difficultyLevels = {
  beginner: {
    clientKnowledge: 'Very limited financial knowledge, needs basic concepts explained',
    feedbackThreshold: 0.5,
    questionComplexity: 'Basic'
  },
  medium: {
    clientKnowledge: 'Some financial knowledge but gaps in understanding',
    feedbackThreshold: 0.65,
    questionComplexity: 'Moderate'
  },
  advanced: {
    clientKnowledge: 'Good financial knowledge but needs clarification on complex topics',
    feedbackThreshold: 0.8,
    questionComplexity: 'Advanced'
  },
  expert: {
    clientKnowledge: 'Highly knowledgeable, may challenge explanations and ask difficult questions',
    feedbackThreshold: 0.9,
    questionComplexity: 'Expert'
  }
};