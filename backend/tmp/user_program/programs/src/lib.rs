use anchor_lang::prelude::*;

#[program]
pub mod user_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
